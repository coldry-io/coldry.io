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

export const ColdryVerifyEmail = ({ name, verificationUrl }: ColdryVerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>You&rsquo;re almost ready to use Coldry!</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-[#f7fbff] font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#dbdedf] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://landing.coldry.io/dist/assets/logo.png`}
                width="143"
                height="39"
                alt="Coldry"
              />
            </Section>
            <Text className="text-[14px] leading-[24px] text-[#2d2d34]">Hello {name},</Text>
            <Text className="text-[14px] leading-[24px] text-[#2d2d34]">
              We&rsquo;re delighted that you&rsquo;ve joined our platform and we&rsquo;re excited to
              have you as part of our community.
            </Text>
            <Text className="text-[14px] leading-[24px] text-[#2d2d34]">
              Before we get started, we kindly ask you to verify your email address to ensure the
              security and integrity of your account.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                pX={20}
                pY={12}
                className="rounded bg-[#abd1f3] text-center text-[12px] font-semibold text-white no-underline"
                href={verificationUrl}
              >
                Verify Email
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-center text-[12px] leading-[24px] text-[#666666]">
              This link will be valid for <span className="font-semibold">7 days</span>. If you were
              not expecting this email, you can ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const ColdryVerifyPlain = ({ name, verificationUrl }: ColdryVerifyEmailProps) =>
  render(<ColdryVerifyEmail name={name} verificationUrl={verificationUrl} />, {
    plainText: true
  });

export default ColdryVerifyEmail;
