"use client";

import React from "react";
import { Button, Container, Form, Image, Stack } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const options = [
  { value: "html", label: "html" },
  { value: "css", label: "css" },
  { value: "js", label: "js" },
  { value: "react", label: "react" },
  { value: "nextjs", label: "nextjs" },
  { value: "php", label: "php" },
  { value: "vue", label: "vue" },
  { value: "flutter", label: "flutter" },
  { value: "typeScript", label: "typeScript" },
  { value: "Node", label: "Node" },
  { value: "Express", label: "Express" },
  { value: "Mongodb", label: "Mongodb" },
  { value: "MySQL", label: "MySQL" },
  { value: "Other", label: "Other" },
];

const PostForm = (props) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    image,
    setImage,
    languages,
    setLanguages,
    isLoading,
    handleSubmit,
  } = props;
  const animatedComponents = makeAnimated();
  const handleSelectOption = (languages) => {
    setLanguages(languages.map((el) => el.value));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  return (
    <>
      <Container>
        <Form className="my-3" onSubmit={handleSubmit}>
          <Stack gap={3}>
            <Form.Group className="mx-auto">
              <Form.Label htmlFor="image">
                {image ? (
                  <Image src={image} alt="" height={300} />
                ) : (
                  <div className="imgFrame">
                    <span>
                      Upload your photo here or{" "}
                      <Button variant="primary">Browse</Button>
                    </span>
                  </div>
                )}
              </Form.Label>
              <Form.Control
                type="file"
                id="image"
                hidden={true}
                onChange={handleImageChange}
                accept="image/*"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="title">Title:</Form.Label>
              <Form.Control
                id="title"
                input="text"
                placeholder="title..."
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Language Uses:</Form.Label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                name="language"
                value={languages.map((value) => ({ value, label: value }))}
                onChange={handleSelectOption}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="description">Description:</Form.Label>
              <textarea
                id="description"
                input="text"
                placeholder="Write Something..."
                className="form-control"
                rows={10}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Posting" : "Post"}
            </Button>
          </Stack>
        </Form>
      </Container>
    </>
  );
};

export default PostForm;
