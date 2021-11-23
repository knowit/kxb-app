import { WithChildren } from "@/types";
import * as React from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { VariantProps } from "stitches.config";
import { Box, Card, Flex, FlexItem, Grid, Heading, Paragraph, Svg } from "./ui";

type BenefitProps = WithChildren<{
  icon?: React.ElementType;
  iconProps?: VariantProps<typeof Svg>;
}>;

const Benefit = ({
  children,
  icon = HiOutlineCheckCircle,
  iconProps = {
    variant: "green"
  }
}: BenefitProps) => {
  const Icon = icon;
  return (
    <Card>
      <Flex
        alignItems="center"
        gap="3"
        css={{
          minHeight: "50px"
        }}
      >
        <Box>
          <Svg as={Icon} {...iconProps} />
        </Box>
        <Box>{children}</Box>
      </Flex>
    </Card>
  );
};

const CompanyBenefits = () => {
  return (
    <Flex
      gap="3"
      css={{
        flexDirection: "column",
        marginBottom: "$6",
        "@bp1": {
          marginBottom: "$12",
          flexDirection: "row"
        }
      }}
    >
      <FlexItem
        css={{
          maxWidth: "100%",
          "@bp1": {
            maxWidth: "320px"
          }
        }}
      >
        <Heading
          size="3"
          color="green"
          noMargin
          css={{
            textAlign: "center",
            "@bp1": {
              textAlign: "left"
            }
          }}
        >
          Knowit Experience Bergen
        </Heading>
        <Heading
          size="3"
          css={{
            textAlign: "center",
            "@bp1": {
              textAlign: "left"
            }
          }}
        >
          Company Benefits
        </Heading>
        <Paragraph
          size="1"
          css={{
            textAlign: "center",
            "@bp1": {
              textAlign: "left"
            }
          }}
        >
          You get paid by commission or guaranteed salary. Knowit covers both employer&apos;s
          national insurance contributions (14.10%) and holyday payment (12%). This means you can
          calculate your next payment by the following formulae{" "}
          <Paragraph
            as="span"
            color="green"
            css={{
              display: "inline"
            }}
          >
            Work hours in month x hourly rate x commission = your salary.
          </Paragraph>
        </Paragraph>
      </FlexItem>
      <Grid
        gap="3"
        css={{
          width: "100%",
          gridTemplateColumns: "repeat(1, 1fr)",
          "@bp1": {
            gridTemplateColumns: "repeat(2, 1fr)"
          }
        }}
      >
        <Benefit>Full pay on paternity leave</Benefit>
        <Benefit>Pension 5,5% of salary from 1G to 12G</Benefit>
        <Benefit>Health insurance for all employees</Benefit>
        <Benefit>New training facilities + scheduled training programmes</Benefit>
        <Benefit>Free phone with free calls, free SMS and 15 GB data every month</Benefit>
        <Benefit>Your choice of computer equipment, PC or Mac, mouse and keyboard</Benefit>
        <Benefit>Subsidized good canteen</Benefit>
        <Benefit>Generous social budget that guarantees lots of fun</Benefit>
      </Grid>
    </Flex>
  );
};

export default CompanyBenefits;
