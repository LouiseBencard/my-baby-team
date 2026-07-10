import ActivityKit
import WidgetKit
import SwiftUI

private let meloMoss = Color(red: 0.149, green: 0.259, blue: 0.212)
private let meloCream = Color(red: 0.965, green: 0.945, blue: 0.906)
private let meloSage = Color(red: 0.478, green: 0.612, blue: 0.510)

struct SleepWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: SleepActivityAttributes.self) { context in
            LockScreenView(context: context)
                .activityBackgroundTint(meloMoss)
                .activitySystemActionForegroundColor(meloCream)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    HStack(spacing: 8) {
                        Text(context.state.sleepType == "night" ? "🌙" : "😴")
                            .font(.title2)
                        Text(context.attributes.childName)
                            .font(.system(size: 15, weight: .semibold, design: .serif))
                            .foregroundColor(meloCream)
                    }
                    .padding(.leading, 4)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text(timerInterval: context.state.startTime...Date.distantFuture, countsDown: false)
                        .font(.system(size: 22, weight: .semibold, design: .rounded))
                        .monospacedDigit()
                        .foregroundColor(meloCream)
                        .frame(maxWidth: 90)
                        .padding(.trailing, 4)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text(context.state.sleepType == "night" ? "Nattesøvn i gang" : "Lur i gang")
                        .font(.system(size: 12))
                        .foregroundColor(meloCream.opacity(0.7))
                }
            } compactLeading: {
                Text(context.state.sleepType == "night" ? "🌙" : "😴")
            } compactTrailing: {
                Text(timerInterval: context.state.startTime...Date.distantFuture, countsDown: false)
                    .font(.system(size: 13, weight: .medium, design: .rounded))
                    .monospacedDigit()
                    .foregroundColor(meloSage)
                    .frame(maxWidth: 52)
            } minimal: {
                Text("😴")
            }
        }
    }
}

private struct LockScreenView: View {
    let context: ActivityViewContext<SleepActivityAttributes>

    var body: some View {
        HStack(spacing: 14) {
            ZStack {
                Circle()
                    .fill(meloSage.opacity(0.25))
                    .frame(width: 44, height: 44)
                Text(String(context.attributes.childName.prefix(1)))
                    .font(.system(size: 18, weight: .semibold, design: .serif))
                    .foregroundColor(meloCream)
            }
            VStack(alignment: .leading, spacing: 3) {
                Text("\(context.attributes.childName) sover")
                    .font(.system(size: 16, weight: .semibold, design: .serif))
                    .foregroundColor(meloCream)
                HStack(spacing: 5) {
                    Circle()
                        .fill(meloSage)
                        .frame(width: 6, height: 6)
                    Text(context.state.sleepType == "night" ? "Nattesøvn" : "Lur")
                        .font(.system(size: 12))
                        .foregroundColor(meloCream.opacity(0.65))
                }
            }
            Spacer()
            Text(timerInterval: context.state.startTime...Date.distantFuture, countsDown: false)
                .font(.system(size: 28, weight: .semibold, design: .rounded))
                .monospacedDigit()
                .foregroundColor(meloCream)
                .frame(maxWidth: 110)
                .multilineTextAlignment(.trailing)
        }
        .padding(16)
    }
}
