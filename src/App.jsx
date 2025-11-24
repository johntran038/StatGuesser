import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const Home = lazy(() => import("./pages/Home"));
  // const TestParam = lazy(() => import("./pages/TestParam"));

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          {/* <Route exact path="/products/test/:param" element={<TestParam/>} /> */}
        </Routes>
      </Suspense>
    </>
  )
}

export default App
