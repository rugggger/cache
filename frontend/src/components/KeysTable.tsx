import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetCacheState } from "../services/cache";
import { Key } from "../types";
import { Button, Typography } from "@mui/material";

interface Props {
  onKeyClick: (key: string) => void;
}
const KeysTable = (props: Props) => {
  const { onKeyClick } = props;
  const [keys, setKeys] = React.useState<Key[]>([]);
  const [freeMem, setFreeMem] = React.useState<number>(0);
  React.useEffect(() => {
    async function fetch() {
      let data;
      try {
        data = await GetCacheState();
      } catch (e) {}
      if (data) {
        setKeys(data.keys);
        setFreeMem(data.freeMemory);
      }
    }
    const handle = setInterval(fetch, 2000);
    return () => {
      clearInterval(handle);
    };
  }, []);

  const timeFormat = (time: number) => {
    const d = new Date(time);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  };

  return (
    <>
      <Typography>Items {keys.length}</Typography>
      <Typography>Free memory {freeMem}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell align="right">Created</TableCell>
              <TableCell align="right">Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keys.map((key, i) => (
              <React.Fragment key={i}>
                <TableRow>
                  <TableCell>
                    <Button
                      onClick={() => {
                        onKeyClick(key.id);
                      }}
                    >
                      {key.id}
                    </Button>
                  </TableCell>
                  <TableCell align="right">{timeFormat(key.created)}</TableCell>
                  <TableCell align="right">{timeFormat(key.updated)}</TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default KeysTable;
