import React from 'react';

import SkewBg from '@common/SkewBg';
import PageHeader from '@common/PageHeader';
import Flex from '@common/Flex';

import Quote from './Quote';
import Avatar from './Avatar';

import { AboutWrapper, AboutInfo } from './About.style';

const About = () => {
  return (
    <AboutWrapper id="about">
      <PageHeader>About Me</PageHeader>
      <SkewBg />
      <AboutInfo>
        <div>
          <Avatar src="hfest_avatar_2.jpg" />
        </div>
        <p>
          Hi, my name is Akash Kundu. I am a school student and occasionally designing websites, applications, and everything in between. I do developer friendly code which is very too easy to understand and customized it as per needs.
        </p>
      </AboutInfo>

      <Flex justify="space-between" className="quotes__wrapper">
        <Quote>
          <p>“Simplicity is the baddest choice to be the best.“</p>
        </Quote>
        <Quote>
          <p>
            “I know I’m not successful enough, but I’m passionate enough not to
            worry about success.“
          </p>
        </Quote>
        <Quote>
          <p>
            “Creativity is the driver of an unstoppable train called Passion.”
          </p>
        </Quote>
      </Flex>
    </AboutWrapper>
  );
};

export default About;
