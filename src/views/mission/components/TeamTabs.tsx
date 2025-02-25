import { SimpleGrid, TabsProps } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import {
  CustomTab,
  CustomTabList,
  CustomTabs,
  CustomTabPanel,
  CustomTabPanels,
} from '@components/CustomTabs';
import { CATEGORIES, MEMBERS } from '@consts/team';

import TeamMemberCard from './TeamMemberCard';

const getMembersForSpecificCategory = (
  category: typeof CATEGORIES[keyof typeof CATEGORIES]
): Partial<typeof MEMBERS> => MEMBERS.filter((member) => member.categories.includes(category));

const TeamTabs: FunctionComponent<Omit<TabsProps, 'children'>> = (props) => (
  <CustomTabs {...props}>
    <CustomTabList minW={250} w={{ base: 'full', lg: 'auto' }} mr={{ lg: 20, xl: 18 }}>
      {Object.values(CATEGORIES).map((category) => (
        <CustomTab
          itemCount={getMembersForSpecificCategory(category).length}
          key={category}
          id={category}
        >
          {category}
        </CustomTab>
      ))}
    </CustomTabList>

    <CustomTabPanels>
      {Object.values(CATEGORIES).map((category) => (
        <CustomTabPanel id={category} key={category}>
          <SimpleGrid
            columns={{ base: 1, xl: 2 }}
            spacingY={{ base: 5, lg: 8 }}
            spacingX={{ lg: 6 }}
          >
            {getMembersForSpecificCategory(category)?.map(
              (member) => member && <TeamMemberCard key={member.name} {...member} />
            )}
          </SimpleGrid>
        </CustomTabPanel>
      ))}
    </CustomTabPanels>
  </CustomTabs>
);

export default TeamTabs;
