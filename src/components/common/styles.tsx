import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

export const RowDiv = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CenteredProgressBar = styled(CircularProgress)`
  display: block;
  position: fixed;
  top: 50%;
  right: 50%;
  margin-top: -..px;
  margin-right: -..px;
`;
