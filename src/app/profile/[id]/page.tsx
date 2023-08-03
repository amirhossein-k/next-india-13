"use client";
import React from "react";

const page = ({params}: {params: {id: string}}) => {
  return <div>profile Id {params.id}</div>;
};

export default page;
