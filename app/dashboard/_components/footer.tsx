import { Icons } from "@/components/icons";
import { ThemeSelect } from "@/components/theme-select";
import { Box } from "@/components/ui/box";
import { Flex } from "@/components/ui/flex";
import Link from "@/components/ui/link";

export default function Footer() {
  return (
    <footer className="border-t border-t-neutral-700">
      <div className="mx-auto max-w-5xl px-3 pt-4 pb-24 md:px-4 md:pt-8">
        <Flex justify="between">
          <Box>
            <h2 className="mb-3 text-lg font-bold">Resources</h2>
            <ul className="space-y-2">
              <li>
                <Link href="https://handbooks.simployer.com/nb-no/handbook/100006?sasid=977f713d-b5c3-45ec-ae83-4ff323b4e473">
                  Personal handbook
                </Link>
              </li>
              <li>
                <Link href="https://knowit.cvpartner.com">CV Partner</Link>
              </li>
              <li>
                <Link href="http://helpit.knowit.no">Helpit</Link>
              </li>
              <li>
                <Link href="https://ubw.unit4cloud.com/se_kno_prod_web">Timekeeping</Link>
              </li>
              <li>
                <Link href="https://knowitexperience.slack.com">Slack</Link>
              </li>
              <li>
                <Link href="https://knowit.sharepoint.com/sites/about/SitePages/Home.aspx">
                  Shareit
                </Link>
              </li>
              <li>
                <Link href="https://www.knowit.se/brandbook/introduction/">Brand book</Link>
              </li>
              <li>
                <Link href="https://knowit.sharepoint.com/sites/info-brand-communications/SitePages/Templates/Templates.aspx">
                  Office templates
                </Link>
              </li>
            </ul>
          </Box>
          <Box>
            <h2 className="mb-3 text-lg font-bold">Site</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard">Home</Link>
              </li>
              <li>
                <Link href="/dashboard/profile">Profile</Link>
              </li>
              <li>
                <Link href="/dashboard/feedback">Feedback</Link>
              </li>
            </ul>
          </Box>
          <Box className="max-w-[360px] grow">
            <h2 className="mb-3 text-lg  font-bold">Feedback</h2>
            <ThemeSelect className="ml-auto" />
          </Box>
        </Flex>
        <Flex className="px-0 pt-10 pb-5" justify="center">
          <Icons.Logo className="max-w-[140px]" />
        </Flex>
      </div>
    </footer>
  );
}
