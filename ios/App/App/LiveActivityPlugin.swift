import Foundation
import Capacitor
import ActivityKit

@objc(LiveActivityPlugin)
public class LiveActivityPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "LiveActivityPlugin"
    public let jsName = "LiveActivity"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "startSleepActivity", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "endSleepActivity", returnType: CAPPluginReturnPromise)
    ]

    @objc func startSleepActivity(_ call: CAPPluginCall) {
        print("🔍 PLUGIN: startSleepActivity modtaget fra appen")
        guard #available(iOS 16.2, *) else {
            print("❌ PLUGIN: iOS-version under 16.2")
            call.resolve()
            return
        }
        guard ActivityAuthorizationInfo().areActivitiesEnabled else {
            print("❌ PLUGIN: Live Activities ikke tilladt i Indstillinger")
            call.resolve()
            return
        }

        let childName = call.getString("childName") ?? "Baby"
        let startMs = call.getDouble("startTime") ?? Date().timeIntervalSince1970 * 1000
        let sleepType = call.getString("sleepType") ?? "nap"
        let startDate = Date(timeIntervalSince1970: startMs / 1000)

        Task {
            for activity in Activity<SleepActivityAttributes>.activities {
                await activity.end(nil, dismissalPolicy: .immediate)
            }

            let attributes = SleepActivityAttributes(childName: childName)
            let state = SleepActivityAttributes.ContentState(startTime: startDate, sleepType: sleepType)

            do {
                _ = try Activity.request(
                    attributes: attributes,
                    content: .init(state: state, staleDate: nil)
                )
                print("✅ PLUGIN: Live Activity startet for \(childName)")
                call.resolve()
            } catch {
                print("❌ PLUGIN: \(error)")
                call.reject("Kunne ikke starte Live Activity: \(error.localizedDescription)")
            }
        }
    }

    @objc func endSleepActivity(_ call: CAPPluginCall) {
        print("🔍 PLUGIN: endSleepActivity modtaget")
        guard #available(iOS 16.2, *) else {
            call.resolve()
            return
        }
        Task {
            for activity in Activity<SleepActivityAttributes>.activities {
                await activity.end(nil, dismissalPolicy: .immediate)
            }
            call.resolve()
        }
    }
}
