import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import AppWrapper from "./(redux)/AppWrapper";
import { store } from "./(redux)/store";
import queryClient from "./(service)/queryClient";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppWrapper />
      </QueryClientProvider>
    </Provider>
  );
}
