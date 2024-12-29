"use client";
import {
  Grid2,
  Switch,
  Typography as Font,
  Button,
  Stack,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Companies from "../components/Companies/Companies";
import CenterCard from "../Layouts/CenterCard";
import { DefaultScreenProps } from "../page";
import { CompanyType } from "../components/CompanyForm/CompanyForm";
import { useConfirm } from "material-ui-confirm";

export default function Home(props: DefaultScreenProps) {
  const [layoutType, setLayoutType] = useState("grid");
  const [edit, setEdit] = useState(false);
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [companyList, setCompanyList] = useState<CompanyListType[]>([]);
  const confirm = useConfirm();

  const getCompanies = (): CompanyType[] | null => {
    const companiesData = localStorage.getItem("companies");
    if (companiesData) {
      return JSON.parse(companiesData);
    }
    return null;
  };
  useEffect(() => {
    const data = getCompanies();
    if (data) setCompanies(data);
  }, []);

  useEffect(() => {
    setCompanyList(
      companies.map((c) => {
        return { ...c, action: handleCompany };
      })
    );
  }, [edit, companies]);

  const handleLayout = () => {
    setLayoutType(layoutType === "grid" ? "list" : "grid");
  };

  const editMode = () => setEdit((e) => !e);

  const handleCompany = (id: string) => {
    props.setSelectedCompany(id);
    props.useScreen("paperLayouts")
  };

  const editCompany = (id: string) => {};

  const deleteCompany = async (id: string) => {
    const data = getCompanies();
    if (!data) return;
    let deleted;
    const newList = data.filter((c) => {
      if (c.id === id) deleted = c.name;
      return c.id !== id;
    });
    try {
      await confirm({
        description: `This will delete ${deleted}.`,
        confirmationText: "YES",
      });
      localStorage.setItem("companies", JSON.stringify(newList));
      setCompanies(newList);
      props.sendNotification(`${deleted} has been deleted`, "error");
    } catch {}
  };

  return (
    <CenterCard>
      <Grid2 container size={12} spacing={2}>
        <Grid2 size={12}>
          <Stack direction="row" alignItems="center" justifyContent="end">
            <Font>Grid</Font>
            <Switch
              color="primary"
              value={layoutType}
              onChange={handleLayout}
            />
            <Font>List</Font>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <Font align="center" variant="h1">
            Company Selection
          </Font>
        </Grid2>
        <Grid2
          size={12}
          justifyContent="center"
          height="50vh"
          overflow="scroll"
        >
          <Companies
            companies={companyList}
            useScreen={props.useScreen}
            edit={edit}
            deleteCompany={deleteCompany}
            editCompany={editCompany}
          />
        </Grid2>
        <Grid2 size={12} textAlign="right">
          <Button
            variant="contained"
            color={edit ? "warning" : "primary"}
            startIcon={<Edit />}
            onClick={editMode}
          >
            <Font variant="button">Edit</Font>
          </Button>
        </Grid2>
      </Grid2>
    </CenterCard>
  );
}
export interface CompanyListType extends CompanyType {
  action: any;
}
