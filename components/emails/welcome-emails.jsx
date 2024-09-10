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
  Text,
} from "@react-email/components";
import * as React from "react";

export const KoalaWelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://cdn.sanity.io/images/vjla2y3b/production/ce6dd431c3ef7aa7ff635276ab05d5e5c45aea1f-500x500.png"
          width="50"
          height="50"
          alt="Koala"
          style={logo}
        />
        <Text style={paragraph}>Hi Aman,</Text>
        <Text style={paragraph}>
          You got the new subscriber. Please check the details.
        </Text>
        <Section style={btnContainer}>
          {/* <Button style={button} href="https://getkoala.com">
            Get started
          </Button> */}
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Den Digital team
        </Text>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

export default KoalaWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
