"use client";
import { themeRecoil } from "@/recoil/ThemeRecoil";
import { Flex, Text, Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

export default function Main() {
  const router = useRouter();
  const [theme, setTheme] = useRecoilState(themeRecoil);
  return (
    <>
      {" "}
      <Flex p={"9"} gap={"5"} justify={"center"} align={"center"}>
        <Text size={"5"}>{`Make your Survey Form ! `}</Text>
        <Button
          color={theme === true ? "cyan" : "gray"}
          size={"3"}
          onClick={() => {
            router.push("/makeForm");
          }}
        >
          {" "}
          {`Let's go`}
        </Button>
      </Flex>
      <Flex p={"9"} gap={"5"} justify={"center"} align={"center"}>
        <Text size={"5"}>{`See n Test Chart`}</Text>
        <Button
          color={theme === true ? "cyan" : "gray"}
          size={"3"}
          onClick={() => {
            router.push("/chart");
          }}
        >
          {" "}
          {`Let's go`}
        </Button>
      </Flex>
    </>
  );
}
