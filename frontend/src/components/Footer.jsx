import {
  Box,
  Typography,
  Stack,
  Button,
  Fab,
  Grid,
  Container,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assests/images/logo512.webp";
import { navItems } from "../utils/constants";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  ThreadsIcon,
  ThreadsShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TelegramIcon,
  TelegramShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
const Footer = () => {
  const currentUrl = window.location.href;
  const title = "Check out this awesome post!";
  const StyledFab = styled(Fab)(({ theme }) => ({
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }));
  return (
    <Box
      component="footer"
      sx={{
        backdropFilter: "blur(24px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 2px rgba(29, 29, 29, 0.15)",
        padding: "8px 16px",
        py: 4,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Button disableRipple color="inherit" component={Link} to="/">
              <Box
                component="img"
                src={logo}
                alt="logo"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: { xs: "20px", sm: "25px" },
                  height: { xs: "20px", sm: "25px" },
                  mr: 0.75,
                }}
              />
              Blog
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                flexWrap: "wrap",
              }}
            >
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  color="inherit"
                  component={Link}
                  to={item.path}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Support</Typography>
            <Typography>Contact Us</Typography>
            <Typography>
              Made with{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                height={15}
                viewBox="0 0 512 512"
              >
                <path
                  fill="red"
                  d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                ></path>
              </svg>{" "}
              in India.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Social Links</Typography>
            <Stack sx={{ display: "flex" }} direction="row" spacing={2}>
              <TwitterShareButton url={currentUrl} title={title}>
                <XIcon round size={35} />
              </TwitterShareButton>
              <ThreadsShareButton url={currentUrl} title={title}>
                <ThreadsIcon round size={35} />
              </ThreadsShareButton>
              <LinkedinShareButton url={currentUrl} title="Check this out!">
                <LinkedinIcon round size={35} />
              </LinkedinShareButton>
              <TelegramShareButton url={currentUrl} title="Check this out!">
                <TelegramIcon round size={35} />
              </TelegramShareButton>
              <WhatsappShareButton
                url={currentUrl}
                title={title}
                separator=" - "
              >
                <WhatsappIcon round size={35} />
              </WhatsappShareButton>
              <FacebookShareButton url={currentUrl} quote={title}>
                <FacebookIcon round size={35} />
              </FacebookShareButton>
            </Stack>
            <StyledFab color="primary" size="medium" aria-label="scrollTop">
              <ArrowUpwardIcon />
            </StyledFab>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
