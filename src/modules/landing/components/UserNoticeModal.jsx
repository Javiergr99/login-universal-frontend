import PropTypes from "prop-types";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  Typography,
} from "@mui/material";

const noop = () => {};

export default function UserNoticeModal({ open, onAccept, onReject = noop }) {
  return (
    <Modal
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 220,
          sx: {
            backgroundColor: "rgba(0,0,0,0.22)",
          },
        },
      }}
      aria-labelledby="aviso-personas-usuarias-title"
      aria-describedby="aviso-personas-usuarias-description"
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: { xs: "50%", md: "40%" },
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "92%", sm: "86%", md: "760px" },
            maxWidth: "760px",
            bgcolor: "#ffffff",
            borderRadius: "6px",
            boxShadow: "0 18px 36px rgba(0,0,0,0.18)",
            px: { xs: 2.5, md: 3.5 },
            py: { xs: 2.5, md: 3 },
            outline: "none",
          }}
        >
          <Typography
            id="aviso-personas-usuarias-title"
            sx={{
              fontFamily: "Noto Sans, sans-serif",
              fontSize: { xs: "1.1rem", md: "1.45rem" },
              fontWeight: 800,
              color: "#7a1237",
              mb: 1.6,
            }}
          >
            Aviso a Personas Usuarias
          </Typography>

          <Box id="aviso-personas-usuarias-description">
            <Typography
              sx={{
                fontFamily: "Noto Sans, sans-serif",
                fontSize: { xs: "0.92rem", md: "0.96rem" },
                lineHeight: 1.8,
                color: "#6d6d6d",
                mb: 1.2,
              }}
            >
              La información que está a punto de consultar corresponde a la
              versión pública del Sistema de Información “Por tus Derechos”.
            </Typography>

            <Typography
              sx={{
                fontFamily: "Noto Sans, sans-serif",
                fontSize: { xs: "0.92rem", md: "0.96rem" },
                lineHeight: 1.8,
                color: "#6d6d6d",
                mb: 1.2,
              }}
            >
              Esta versión contiene datos de carácter general, anonimizados y
              sin información sensible.
            </Typography>

            <Typography
              sx={{
                fontFamily: "Noto Sans, sans-serif",
                fontSize: { xs: "0.92rem", md: "0.96rem" },
                lineHeight: 1.8,
                color: "#6d6d6d",
              }}
            >
              Al continuar, usted acepta que hará uso responsable de la
              información consultada y reconoce que su contenido es únicamente
              de carácter informativo.
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1.2}
            justifyContent="flex-end"
            sx={{ mt: 2.6 }}
          >
            <Button
              variant="contained"
              onClick={onReject}
              sx={{
                minWidth: 118,
                height: 34,
                textTransform: "none",
                fontSize: "0.82rem",
                fontWeight: 700,
                borderRadius: "2px",
                backgroundColor: "#767676",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#5d5d5d",
                  boxShadow: "none",
                },
              }}
            >
              No aceptar
            </Button>

            <Button
              variant="contained"
              onClick={onAccept}
              sx={{
                minWidth: 100,
                height: 34,
                textTransform: "none",
                fontSize: "0.82rem",
                fontWeight: 700,
                borderRadius: "2px",
                backgroundColor: "#7a1237",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#61102d",
                  boxShadow: "none",
                },
              }}
            >
              Aceptar
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}

UserNoticeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func,
};