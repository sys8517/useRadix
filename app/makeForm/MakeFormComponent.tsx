"use client";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  RadioGroup,
  Select,
  Strong,
  Text,
  TextField,
  TextFieldInput,
} from "@radix-ui/themes";
import { useState, useEffect, useRef } from "react";
import styles from "./MakeFormComponent.module.scss";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { themeRecoil } from "@/recoil/ThemeRecoil";
import { RiPrinterLine } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";

type MakeFormItemType = {
  formLabel: string;
  formType: string;
  seq: number;
  items?: string[];
};

export default function MakeFormComponent() {
  const [theme, setTheme] = useRecoilState(themeRecoil);

  const [formList, setFormList] = useState<MakeFormItemType[]>([
    { formLabel: "", formType: "", seq: 0 },
  ]);

  const [sTitle, setSTitle] = useState("");

  const printRef = useRef(null);

  const onPrint = useReactToPrint({
    content: () => {
      return printRef.current;
    },
  });

  useEffect(() => {
    console.log("form : ", formList);
  }, [formList]);
  return (
    <Flex
      className={theme === true ? styles.wrap_div_day : styles.wrap_div_night}
      direction={"column"}
      p={"7"}
      gap={"3"}
    >
      <Flex
        mt={"4"}
        gap={"2"}
        width={"100%"}
        align={"center"}
        justify={"start"}
      >
        <label htmlFor="formQues"> 설문 제목 </label>
        <TextField.Root className={styles.input_custom}>
          <TextField.Input
            color={theme === true ? "cyan" : "gray"}
            id="formQues"
            size="3"
            value={sTitle}
            onChange={(e) => {
              setSTitle(e.currentTarget.value);
            }}
            placeholder="설문 제목을 입력해주세요."
          />
        </TextField.Root>
      </Flex>

      {formList.map((item: MakeFormItemType, i: number) => {
        return (
          <>
            <Flex
              mt={"4"}
              gap={"2"}
              width={"100%"}
              align={"center"}
              justify={"start"}
            >
              <label htmlFor="formQues"> 설문 내용 </label>
              <TextField.Root className={styles.input_custom}>
                <TextField.Input
                  color={theme === true ? "cyan" : "crimson"}
                  id="formQues"
                  size="3"
                  value={item.formLabel}
                  onChange={(e) => {
                    const copy = _.cloneDeep(formList);
                    copy[i] = {
                      ...item,
                      formLabel: e.currentTarget.value,
                    };
                    setFormList(() => {
                      return copy;
                    });
                  }}
                  placeholder="질문할 내용을 입력해주세요."
                />
              </TextField.Root>
              <Button
                color={theme === true ? "cyan" : "gray"}
                onClick={() => {
                  const copy = _.cloneDeep(formList);
                  copy.push({
                    formLabel: "",
                    formType: "",
                    seq: copy.length,
                  });
                  setFormList(() => {
                    return copy;
                  });
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Button>
              <Button
                color={"crimson"}
                onClick={() => {
                  if (formList.length <= 1) {
                  } else {
                    const copy = _.cloneDeep(formList);
                    copy.splice(i, 1);
                    setFormList(() => {
                      return copy;
                    });
                  }
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Button>
            </Flex>
            <Flex
              gap="2"
              direction="row"
              align={"center"}
              justify={"center"}
              mt={"4"}
            >
              <Text>답변 유형 </Text>
              <Select.Root
                onValueChange={(e) => {
                  const copy = _.cloneDeep(formList);
                  if (
                    (item.items == undefined || item.items.length === 0) &&
                    (e === "radio" || e === "checkbox")
                  ) {
                    copy[i] = {
                      ...item,
                      formType: e,
                      items: [""],
                    };
                  } else {
                    copy[i] = {
                      ...item,
                      formType: e,
                    };
                  }

                  setFormList(() => {
                    return copy;
                  });
                }}
                size={"3"}
                defaultValue=""
              >
                <Select.Trigger
                  className={theme === false ? styles.theme_day : ""}
                  color={theme === true ? "cyan" : "gray"}
                  variant="soft"
                />
                <Select.Content color={theme === true ? "cyan" : "gray"}>
                  <Select.Item value="">답변 유형 선택</Select.Item>
                  <Select.Item value="radio">단일 항목 선택</Select.Item>
                  <Select.Item value="checkbox">여러 항목 선택</Select.Item>
                  <Select.Item value="input">주관식 답변</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
            <Flex
              mt={"3"}
              direction={"column"}
              justify={"center"}
              align={"center"}
              gap={"3"}
            >
              {item.formType === "input" ? null : item.formType ===
                  "checkbox" || item.formType === "radio" ? (
                <>
                  {item.items?.length !== 0 &&
                    item.items?.map((innerItem, j) => {
                      console.log("as");

                      return (
                        <>
                          <Flex
                            direction={"row"}
                            justify={"center"}
                            align={"center"}
                            gap={"1"}
                          >
                            <label
                              className={styles.screen_out}
                              htmlFor="formQues"
                            >
                              {innerItem + "선택"}
                            </label>
                            <TextField.Root
                              className={styles.item_input_custom}
                            >
                              <TextField.Input
                                color={theme === true ? "cyan" : "gray"}
                                id="formQues"
                                size="3"
                                width={"40%"}
                                value={innerItem}
                                onChange={(e) => {
                                  const copy = _.cloneDeep(formList);

                                  //@ts-ignore
                                  copy[i].items[j] = e.currentTarget.value;

                                  setFormList(copy);
                                }}
                                placeholder={`내용 ${j + 1}`}
                              />
                            </TextField.Root>
                            <Button
                              color={theme === true ? "cyan" : "gray"}
                              onClick={() => {
                                const copy = _.cloneDeep(formList);
                                copy[i].items?.push("");
                                setFormList(() => {
                                  return copy;
                                });
                              }}
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </Button>
                            <Button
                              color={"crimson"}
                              onClick={() => {
                                //@ts-ignore

                                if (item.items?.length <= 1) {
                                } else {
                                  const copy = _.cloneDeep(formList);
                                  copy[i].items?.splice(j, 1);
                                  setFormList(() => {
                                    return copy;
                                  });
                                }
                              }}
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
                                  fill="currentColor"
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </Button>
                          </Flex>
                        </>
                      );
                    })}
                </>
              ) : null}
            </Flex>
            <hr
              style={{
                marginTop: "30px",
                backgroundColor: "#bdbdbd",
                border: 0,
                height: "1px",
              }}
            />
          </>
        );
      })}
      {/* -------------------------------------------------- */}
      {/* <hr
        style={{
            marginTop: "30px",
            backgroundColor: "#bdbdbd",
            border: 0,
            height: "1px",
        }}
    /> */}

      <Flex
        className={styles.bottom_box}
        mt={"8"}
        direction={"column"}
        justify={"center"}
        align={"center"}
        width={"100%"}
        ref={printRef}
        p={"6"}
      >
        <Flex
          className={styles.icon_print}
          width={"100%"}
          direction={"row"}
          justify={"end"}
        >
          <Button
            onClick={() => {
              onPrint();
            }}
            color={theme === true ? "cyan" : "crimson"}
          >
            <RiPrinterLine
              size={25}
              role="img"
              aria-label="인쇄하기 아이콘"
              tabIndex={0}
            />
          </Button>
        </Flex>
        <Strong style={{ fontSize: "30px", marginTop: "15px" }}>
          {sTitle}
        </Strong>
        {formList.map((item: MakeFormItemType, i: number) => {
          return (
            <>
              <Flex
                mt={"4"}
                gap={"2"}
                width={"100%"}
                align={"center"}
                justify={"center"}
              >
                <Text>{item.formLabel !== "" ? `질문 ${i + 1} -` : " "}</Text>
                <Text>{item.formLabel}</Text>
              </Flex>
              <Flex
                gap="2"
                style={{ width: "65%" }}
                direction="row"
                align={"center"}
                justify={"center"}
                mt={"4"}
              >
                {item.formType === "radio" ? (
                  <>
                    {" "}
                    <RadioGroup.Root
                      color={theme === true ? "cyan" : "crimson"}
                      defaultValue="radio"
                    >
                      <Flex
                        gap="2"
                        direction="column"
                        align={"center"}
                        justify={"center"}
                        mt={"4"}
                      >
                        {item.items &&
                          item.items.map((choiceItem, num) => {
                            if (choiceItem !== "") {
                              return (
                                <label key={choiceItem + num}>
                                  <Flex gap="2" align="center">
                                    <RadioGroup.Item value={choiceItem} />
                                    <Text size="2">{choiceItem}</Text>
                                  </Flex>
                                </label>
                              );
                            }
                          })}
                      </Flex>
                    </RadioGroup.Root>
                  </>
                ) : item.formType === "input" ? (
                  <>
                    {" "}
                    <Flex
                      mt={"4"}
                      gap={"2"}
                      width={"100%"}
                      align={"center"}
                      justify={"center"}
                    >
                      <label htmlFor="formQues"> 답변 </label>
                      <TextField.Root className={styles.input_custom}>
                        <TextField.Input
                          color={theme === true ? "cyan" : "crimson"}
                          id="formQues"
                          size="3"
                          width={"100%"}
                          onChange={(e) => {}}
                          placeholder="설문에 대한 답을 입력해주세요."
                        />
                      </TextField.Root>
                    </Flex>
                  </>
                ) : item.formType === "checkbox" ? (
                  <>
                    <Flex direction="column" gap="3" style={{ maxWidth: 300 }}>
                      {item.items &&
                        item.items.map((choiceItem, num) => {
                          if (choiceItem !== "") {
                            return (
                              <Text key={i + num} asChild size="3">
                                <Flex align="center" gap="2">
                                  <Checkbox
                                    color={theme === true ? "cyan" : "crimson"}
                                    id={choiceItem + num}
                                  />
                                  <label htmlFor={choiceItem + num}>
                                    {choiceItem}
                                  </label>
                                </Flex>
                              </Text>
                            );
                          }
                        })}
                    </Flex>
                  </>
                ) : null}
              </Flex>
            </>
          );
        })}
      </Flex>
    </Flex>
  );
}
