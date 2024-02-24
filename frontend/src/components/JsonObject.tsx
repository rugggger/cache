import { Grid, Textarea } from "@mui/joy";
import React from "react";
import { Item } from "../pages/gridUtils";
import { Button, Input } from "@mui/material";
import { GetCache } from "../services/cache";

interface Props {
  showItemKey?: string;
  onButton: (key: string, o: Object) => void;
}
const JSONObject = (props: Props) => {
  const { onButton, showItemKey } = props;
  const [JSONObject, setJSON] = React.useState<Object | null>(null);
  const [textareaVal, setTextareaVal] = React.useState<string>("");
  const [key, setKey] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchKey(key: string) {
      let data;
      try {
        data = await GetCache(key);
      } catch (e) {}
      if (data) {
        setKey(showItemKey||"")
        setTextareaVal(JSON.stringify(data))
      }
    }
    if (showItemKey) {
      fetchKey(showItemKey);
    }
  }, [showItemKey]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setTextareaVal(text)
    try {
      setJSON(JSON.parse(text));
    } catch (e) {
      setJSON(null);
    }
  };

  const handleClick = () => {
    if (JSONObject) {
      onButton(key, JSONObject);
    }
  };

  return (
    <Grid xs={12}>
      <Item>
        <Input
          
          value={key}
          onChange={(e) => setKey(e.target.value)}
          fullWidth={true}
          placeholder="Cache key"
        />

        <Textarea 
        placeholder="Enter JSON..."
        minRows={10} value={textareaVal} onChange={handleChange} size="lg" />
      </Item>
      <Item>
        <Button
          onClick={handleClick}
          variant="contained"
          disabled={JSONObject == null || key == ""}
        >
          Put
        </Button>
      </Item>
    </Grid>
  );
};

export default JSONObject;
