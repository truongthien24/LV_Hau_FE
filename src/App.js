import "./App.css";
import { MainRoutes } from "./Router/router";
// import "antd/dist/reset.css";
import { QueryClient, QueryClientProvider } from "react-query";
import LayoutMaster from "fuse/LayoutMaster";
// import "@ant-design/flowchart/dist/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

function App() {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <LayoutMaster component={<MainRoutes />}/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
