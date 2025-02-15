import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Modal,
  Backdrop,
  Fade,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RowersPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // State to handle the selected card and modal visibility
  const [selectedSection, setSelectedSection] = useState<
    null | (typeof sections)[0]
  >(null);

  // Sections data
  const sections = [
    {
      letter: "R",
      title: "Roadblock",
      description:
        "How well do you understand the customer's Pain and the obstacles or hindrances that are preventing the customer from achieving their goals or growing their business?",
      color: theme.palette.primary.main,
      titleDescription:
        "Roadblock - Assessing Customer Pain or Critical Business Issues",
      steps: [
        "1: No clear pain or critical issue identified; customer shows no urgency to adress problems.",
        "2: A minor issue is identified, but it is not critical or driving change.",
        "3: A problem exists, but it is not clearly articulated or widely recognized by stakeholders.",
        "4: A clear and significant pain is recognized by the customer, but they are not exploring solutions.",
        "5: A well-defined and urgent problem exists, and solving it is a priority for the customer.",
      ],
    },
    {
      letter: "O",
      title: "Ownership",
      description:
        "Who in the customer's organization has responsibility for solving the problem (PAIN) and how engaged are they in driving the solution forward?",
      color: theme.palette.secondary.main,
      titleDescription: "Ownership - Who Owns the Problem and the Solution",
      steps: [
        "1: No clear owner of the problem or decision-making process is identified.",
        "2: Ownership is unclear or split across multiple individuals with conflicting priorities.",
        "3: A stakeholder (sponsor) owns the problem but has limited authority or influence.",
        "4: A strong champion with authority acknowledges the problem and is engaged in discussions to fix it.",
        "5: A decision-maker or executive sponsor acknowledges the problem and is actively driving the decision.",
      ],
    },
    {
      letter: "W",
      title: "Win Likelihood",
      description:
        "How likely are you to win the deal, considering your position against competitors and internal support?",
      color: theme.palette.success.main,
      titleDescription:
        "Win Likelihood - Likelihood of Winning the Opportunity",
      steps: [
        "1: Very low likelihood of winning; significant misalignment with customer needs or preferences.",
        "2: Low likelihood; the solution partially meets customer needs, but competitors are favored.",
        "3: Moderate likelihood; solution meets needs, but differentiation or engagement is weak.",
        "4: High likelihood; strong alignment with customer needs, and the value is clearly understood.",
        "5: Very high likelihood; solution is a perfect fit, and customer shows strong buying intent.",
      ],
    },
    {
      letter: "E",
      title: "Economic value",
      description:
        "How compelling is the economic case for your solution (ROI, cost savings, value generation)?",
      color: theme.palette.warning.main,
      titleDescription:
        "Economic value - Assessing the Financial Impact or ROI",
      steps: [
        "1: The economic value is unclear or has not been discussed with the customer.",
        "2: The solution may provide value, but there is no concrete calculation of impact.",
        "3: The economic value is somewhat understood, but the customer perceives it as marginal or unclear.",
        "4: The financial impact is well-articulated, with solid impact/ROI/cost savings that resonate with the customer.",
        "The economic value is compelling, with a clearly quantified and substantial impact that is a key driver of the customer's decision.",
      ],
    },
    {
      letter: "R",
      title: "Risk",
      description:
        "How well are you managing the risks associated with the deal (internal objections, competition, budget)?",
      color: theme.palette.error.main,
      titleDescription: "Risk Management - Assessing Risks to the Opportunity",
      steps: [
        "1: Significant risks exist that are likely to derail the opportunity.",
        "2: Several risks exist, but there is no clear plan to address them.",
        "3: Moderate risks exist, and some mitigation strategies are in place.",
        "4: Low risks, the customer and salesperson have identified and addressed most issues.",
        "5: Minimal or no risks; the customer sees the solution as low-risk and high-reward. ",
      ],
    },
    {
      letter: "S",
      title: "Stakeholders",
      description:
        "How well are you aligned with key stakeholders (decision-makers, influencers, champions)?",
      color: theme.palette.info.main,
      titleDescription: "Stakeholders - Engaging the Right People",
      steps: [
        "1: No engagement with key stakeholders; limited visibility into the buying group.",
        "2: Limited engagement; key stakeholders are not fully aligned or involved.",
        "3: Partial engagement; some key stakeholders are involved, but alignment is unclear.",
        "4: Strong engagement with most stakeholders; alignment is mostly in place.",
        "5: Full engagement with all key stakeholders, with strong alignment and buy-in.",
      ],
    },
  ];

  // Handle card click
  const handleCardClick = (section: (typeof sections)[0]) => {
    setSelectedSection(section);
  };

  // Handle modal close
  const handleClose = () => {
    setSelectedSection(null);
  };

  return (
    <Box width="100%" sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        ROWERS Opportunity Qualification Framework - Key Questions
      </Typography>

      {/* Card Grid */}
      <Grid container spacing={3} justifyContent="center">
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} margin={"5px"}>
            {" "}
            {/* Ensure row-based layout */}
            <Card
              onClick={() => handleCardClick(section)}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderLeft: `6px solid ${section.color}`,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              <CardContent>
                <Typography
                  variant="h2"
                  sx={{ color: section.color, fontWeight: "bold", mb: 2 }}
                >
                  {section.letter}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {section.title}
                </Typography>
                <Typography variant="body1">
                  {section.description.substring(0, 100)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Modal
        open={Boolean(selectedSection)}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Fade in={Boolean(selectedSection)}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "900px",
              p: 5,
              borderRadius: 4,
              boxShadow: theme.shadows[5],
              backgroundColor: "white",
            }}
          >
            {selectedSection && (
              <>
                {/* Top Section */}
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      color: selectedSection.color,
                      fontWeight: "bold",
                      mb: 2,
                    }}
                  >
                    {selectedSection.letter}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {selectedSection.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4 }}>
                    {selectedSection.description}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Bottom Section */}
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    {selectedSection.titleDescription}
                  </Typography>
                  <List>
                    {selectedSection.steps.map((step, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={step} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </>
            )}
          </Paper>
        </Fade>
      </Modal>

      {/* Centered Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/RowersChartPage")}
          sx={{
            fontSize: "1.2rem", // Increase font size
            padding: "10px 20px", // Increase padding
          }}
        >
          View ROWERS Chart
        </Button>
      </Box>
    </Box>
  );
};

export default RowersPage;
