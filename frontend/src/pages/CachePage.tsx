import * as React from "react";
import Page from "./Page";
import { PutCache } from "../services/cache";
import { Textarea, Grid } from "@mui/joy";
import { Button, Input } from "@mui/material";
import { styled } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import JSONObject from "../components/JsonObject";
import { Item } from "./gridUtils";
import KeysTable from "../components/KeysTable";

const CachePage = () => {
  const [selectedKey, setSelectedKey] = React.useState<string>("")
  return (
    <Page title="Cache">
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={12}>
          <Item>
            <KeysTable onKeyClick={(key:string)=>{setSelectedKey(key)}} />
          </Item>
          <Item>
            <JSONObject
              showItemKey={selectedKey}
              onButton={(key: string, o: Object) => {
                PutCache(key, o).then((res) => console.log(res));
              }}
            />
          </Item>
        </Grid>
      </Grid>
    </Page>
  );
};

export default CachePage;
