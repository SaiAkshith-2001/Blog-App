import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Link,
} from "@mui/material";
import fs from "fs";
import matter from "gray-matter";
const dirContent = fs.readdirSync("content", "utf-8");
const blogs = dirContent.map((file) => {
  const fileContent = fs.readFileSync(`content/${fileName}`, "utf-8");
  const { data } = matter(fileContent);
  return data;
});
const Blog = () => {
  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 4 }}>
      {/* Main heading for the blog section */}
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          mb: 8,
          textAlign: "center",
        }}
      >
        Blog
      </Typography>
      {/* Grid layout for blog posts */}
      <Grid container spacing={4}>
        {blogs.map((blog, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card
              sx={{
                borderRadius: "8px",
                boxShadow: 3,
                overflow: "hidden",
                border: "2px solid",
                borderColor: "divider",
              }}
            >
              {/* Blog post image */}
              <CardMedia
                component="img"
                height="250"
                image={blog.image}
                alt={blog.title}
              />
              {/* Blog post content */}
              <CardContent>
                {/* Blog post title */}
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{ fontSize: "1.5rem", fontWeight: "bold", mb: 2 }}
                >
                  {blog.title}
                </Typography>
                {/* Blog post description */}
                <Typography variant="body1" sx={{ mb: 4 }}>
                  {blog.description}
                </Typography>

                {/* Blog post author and date */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 4 }}
                >
                  <span>By {blog.author}</span> |{" "}
                  <span>
                    {new Date(blog.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </Typography>
                {/* Link to the full blog post */}
                <Link
                  href={`/blogpost/${blog.slug}`}
                  underline="none"
                  sx={{
                    display: "inline-block",
                    mt: 2,
                    border: "1px solid",
                    borderColor: "primary.main",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Click here
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blog;
