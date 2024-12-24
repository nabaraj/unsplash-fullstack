import { redirect } from "next/navigation";
import React from "react";

const CollectionId: React.FC = () => {
  // Add your component logic here
  redirect("/collections");
  return <>return to collections</>;
};

export default CollectionId;
