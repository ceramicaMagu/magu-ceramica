import { baseMetadata } from "@/constants/seo";
import ReduxProvider from "@/providers/redux";
import MuiThemeProvider from "@/providers/theme";
import type { Metadata } from "next";
import LayoutWrapper from "./components/LayoutWrapper";
export const metadata: Metadata = baseMetadata

interface Props {
  children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="es">
      <body>
        <ReduxProvider>
          <MuiThemeProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </MuiThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;