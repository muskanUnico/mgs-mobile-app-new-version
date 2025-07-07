import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width } = Dimensions.get("window");

interface Event {
  title: string;
  startTime: string;
  endTime: string;
  backgroundColor: string;
  overlapCount?: number;
  position?: number;
  maxOverlap?: number;
}

const parseTime = (time: string): number => {
  const [hour, minute] = time?.split(":").map(Number);
  return hour + minute / 60;
};

const calculateOverlaps = (events: Event[]): Event[] => {
  // Sort events by start time
  const sortedEvents = events.sort(
    (a, b) => parseTime(a.startTime) - parseTime(b.startTime)
  );

  const overlaps = sortedEvents.map((event) => ({
    ...event,
    overlapCount: 1,
    position: 0,
  }));
  const eventEnds: number[] = [];

  sortedEvents.forEach((event, index) => {
    const eventStart = parseTime(event.startTime);
    const eventEnd = parseTime(event.endTime);

    let overlapCount = 1;
    eventEnds.forEach((end, i) => {
      if (eventStart < end) {
        overlapCount += 1;
        overlaps[index].position = overlaps[i].position! + 1;

        if (overlaps[index].position! >= 5) {
          overlaps[index].position = 0;
        }
      }
    });

    overlaps[index].overlapCount = overlapCount;
    eventEnds.push(eventEnd);
  });

  overlaps.forEach((event, index) => {
    const maxOverlap = Math.max(
      ...overlaps.slice(index).map((e) => e.overlapCount!)
    );
    event.maxOverlap = maxOverlap;
  });

  return overlaps;
};

const Timeline = ({ events, handleCards }: any) => {
  const eventList = calculateOverlaps(events);

  const renderTimeLabels = () => {
    const labels = [];
    for (let i = 0; i <= 24; i++) {
      labels.push(
        <View key={i} style={[styles.timeLabelContainer, { top: i * 60 }]}>
          <Text style={[styles.timeLabel,{fontWeight:800}]}>
            {i.toString().padStart(2, "0")}:00
          </Text>
        </View>
      );
    }
    return labels;
  };

  return (
    <ScrollView
      contentContainerStyle={{
        height: 1440,
        paddingHorizontal: 0,
        paddingVertical: 20,
      }}
    >
      <View style={styles.container}>
        <View style={styles.timeColumn}>{renderTimeLabels()}</View>
        <View style={styles.eventColumn}>
          {eventList.map((event, index) => {
            const start = parseTime(event.startTime);
            const end = parseTime(event.endTime);
            const height = (end - start) * 60;
            const top = start * 60;

            const baseWidth = width - 50;
            const eventWidth = baseWidth / event.maxOverlap!;
            const overlapOffset = (event.position! * eventWidth) / 2;

            return (
              <TouchableOpacity
                onPress={() => handleCards(event, index)}
                key={index}
              >
                <View
                  key={index}
                  style={[
                    styles.eventContainer,
                    {
                      height,
                      top,
                      backgroundColor: event.backgroundColor,
                      width: baseWidth - overlapOffset,
                      left: overlapOffset,
                    },
                  ]}
                >
                  <Text
                    style={styles.eventTitle}
                  >{`${event.startTime} - ${event.endTime}`}</Text>
                  <Text style={styles.eventTime}>{event.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  timeColumn: {
    width: 40,
    alignItems: "flex-end",
  },
  timeLabelContainer: {
    position: "absolute",
    justifyContent: "center",
  },
  timeLabel: {
    fontSize: 12,
    color: "#888",
  },
  eventColumn: {
    flex: 1,
    paddingLeft: 5,
  },
  eventContainer: {
    position: "absolute",
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 8,
    color: "#000",
  },
  eventTime: {
    fontSize: 8,
    color: "#888",
  },
});

export default Timeline;
