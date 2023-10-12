
"use client"
import React from "react";
import {
  Box,
  Button,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import UploadRegion from "../components/upload_region";
import TableRegion from "../components/table_region";

export default function ViewListRegion({ title }: { title: string }) {
  const router = useRouter()
  return (
    <>
      <Stack>
        <Text fw={"bold"}>REGION HOT ISSUE</Text>
      </Stack>
      <Box pt={30}>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: "xl" }}
        >
          <Box>
            <Paper shadow="xs" p="xl">
              <Stack>
                <Select
                  placeholder="PROVINCE"
                  data={[
                    "BALI",
                    "JAWA BARAT",
                    "JAWA TIMUR",
                    "KALIMANTAN TENGAH",
                  ]}
                />
                <Select
                  placeholder="CITY"
                  data={["BADUNG", "DENPASAR", "TABANAN"]}
                />
                <Select
                  placeholder="SUBDISTRICT"
                  data={["KUTA SELATAN ", "KUTA UTARA", "MENGWI"]}
                />
                <Button
                  bg={"gray"}
                  onClick={() => router.push('region-hot-issue?prov=bali')}
                >
                  PROCCESS
                </Button>
              </Stack>
            </Paper>
          </Box>
          <Group
            justify="center"
            grow
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <UploadRegion />
            <Box
              style={{
                border: "1px dashed gray",
                borderRadius: 10,
                padding: 40,
                cursor: "pointer",
              }}
            >
              <Text ta={"center"} size="xl" inline>
                DOWNLOAD
              </Text>
            </Box>
          </Group>
        </SimpleGrid>
      </Box>
      {title && (
        <Box pt={30}>
          <TableRegion />
        </Box>
      )}
    </>
  );
}
