// import { Stack } from "expo-router";

// export default function StackLayout() {
//   return <Stack screenOptions={{ headerShown: false }} />;
// }

import Header from "@/src/components/ui/Header/Header";
import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (props) => <Header {...props} />,
      }}
    />
  );
}
