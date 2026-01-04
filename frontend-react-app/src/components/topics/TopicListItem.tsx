import Topic from "../../types/Topic";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import React from "react";

type Props = {
  topic: Topic;
};

export default function TopicListItem({ topic }: Props) {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton component="a" href={"/topic/" + String(topic.id)}>
          <ListItemText primary={topic.name} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
