import { ListItem, ListItemButton, ListItemText } from "@mui/material";

import Topic from "@/types/Topic";

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
