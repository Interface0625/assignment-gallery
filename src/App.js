import React, {useState, useEffect} from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Container, makeStyles } from '@material-ui/core';
import { GitHub as GitHubIcon, Web as WebIcon} from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  button:{
    color: "#91941f"
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
let data;
export default function Album() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    fetch('/data.json').then(r=>r.json()).then(json=>{
      data = json
      setLoading(false)
    })
  }, [setLoading])

  return loading? "loading...":(
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Final Assingment
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              A gallery of submitted assigment by wonderful students.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {Object.entries(data).map(([key, {projectName, thumbnail, description, github, port}]) => {
              description = description ? description:(<s>Short description.</s>)
              projectName = projectName ? projectName:(<s>Not found</s>)
              return (<Grid item key={key} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={thumbnail?thumbnail:"/not-found.jpg"}
                    title={projectName}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {projectName}
                    </Typography>
                    <Typography>
                      {description}
                    </Typography>
                    <Typography>
                      Author: <b>{key}</b>
                    </Typography>
                  </CardContent>
                  <CardActions style={{color:"#91941f"}}>
                    <Button size="small" className={classes.button} disabled={!port} onClick={()=>window.location.port=port}>
                      <WebIcon/>&nbsp;View
                    </Button>
                    <Button size="small" className={classes.button} disabled={!github} onClick={()=>window.location.href=github}>
                      <GitHubIcon/>&nbsp;Source
                    </Button>
                  </CardActions>
                </Card>
              </Grid>)
            })
          }
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <div align="center"><img src="/logo.jpg"  alt="sti logo"/></div>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Good luck and happy coding!
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          <Button size="small" className={classes.button} onClick={()=>window.location.href="https://github.com/Interface0625/assignment-gallery.git"}>
            <GitHubIcon/>&nbsp;Source
          </Button>
        </Typography>

      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}