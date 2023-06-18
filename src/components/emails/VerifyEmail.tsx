import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';
import { render } from '@react-email/render';
import * as React from 'react';

interface ColdryVerifyEmailProps {
  name: string;
  verificationUrl: string;
}

const ColdryVerifyHTML = ({ name, verificationUrl }: ColdryVerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>You&rsquo;re almost ready to use Coldry!</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[500px] rounded p-[20px]">
            <Section className="my-[40px]">
              <Img
                src={`https://landing.coldry.io/dist/assets/logo.png`}
                width="143"
                height="39"
                alt="Coldry"
              />
            </Section>
            <Text className="text-[14px] text-lg leading-[24px] text-[#2d2d34]">Hi {name},</Text>
            <Text className="text-[14px] leading-[24px] text-[#2d2d34]">
              We&rsquo;re delighted that you&rsquo;ve joined our platform and we&rsquo;re excited to
              have you as part of our community.
            </Text>
            <Text className="text-[14px] leading-[24px] text-[#2d2d34]">
              Before we get started, we kindly ask you to verify your email address to ensure the
              security and integrity of your account.
            </Text>
            <Section className="mb-[32px] mt-[32px]">
              <Button
                pX={20}
                pY={12}
                className="rounded bg-[#2d2d34] px-8 py-4 text-center text-[12px] font-semibold text-white no-underline"
                href={verificationUrl}
              >
                Verify Email Address
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This link will be valid for <span className="font-semibold">7 days</span>. If this
              wasn&rsquo;t you, please ignore this email. If you need help, please contact our
              support team at{' '}
              <a href="mailto:info@coldry.io" className="text-blue-600 no-underline">
                info@coldry.io
              </a>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const ColdryVerifyEmail = ({ name, verificationUrl }: ColdryVerifyEmailProps) => {
  const html = <ColdryVerifyHTML name={name} verificationUrl={verificationUrl} />;

  return {
    react: html,
    text: render(html, { plainText: true })
  };
};

export default ColdryVerifyEmail;
