import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Loader from "../shared/Loader";
import { IntoLoadingContext } from "../../contexts/IntroLoadingContext";
import { ActiveSectionProvider } from "../../contexts/ActiveSectionContext";
import { ActiveStoryProvider } from "../../contexts/ActiveStoryContext";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollSmootherContext } from "../../contexts/ScrollSmootherContext";
import Footer from "./Footer";

export default function Layout() {
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const smootherRef = React.useRef(null);

  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      smooth: 1,
      smoothTouch: 0.9,
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
    });
    return () => {
      smootherRef.current?.kill();
    };
  }, []);

  return (
    <ScrollSmootherContext.Provider value={smootherRef.current}>
      <IntoLoadingContext.Provider value={{ loading, setLoading }}>
        <ActiveSectionProvider>
          <ActiveStoryProvider>
            <Loader startRender={() => setRender(true)} />
            {!loading && <Header />}
            
            <main>
              <div id="smooth-wrapper">
                <div id="smooth-content">
                  {render && <Outlet />}
                  <Footer />
                </div>
              </div>
            </main>
          </ActiveStoryProvider>
        </ActiveSectionProvider>
      </IntoLoadingContext.Provider>
    </ScrollSmootherContext.Provider>
  );
}
