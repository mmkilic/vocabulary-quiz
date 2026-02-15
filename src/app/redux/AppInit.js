"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLevels } from "./enumSlice";

function AppInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLevels());
  }, [dispatch]);

  return null;
}

export default AppInit;
