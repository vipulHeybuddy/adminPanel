import React, { useState } from "react";
// import "react-phone-number-input/style.css";
import "./page.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcnNoQGhleWJ1ZGR5LmNvLmluIiwiaWQiOiI2NjU2YzczNzEzYzUyOGU0ZjU3NjUzNjUiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTcwNTkxMzMsImV4cCI6MTcxNzY2MzkzM30.OXQMrPzFjIezX3RyHpSb5mqvyRsOMLq3-3l8OT7MoJM";



const FormComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [images, setImages] = useState(Array.from({ length: 4 }, () => null));
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [imgurl, setimgurl] = useState("");

  // Your existing state variables and functions...
  const [category, setCategory] = useState("");
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const [state, setState] = useState({
    type: "caseStudies",
    category: category,
    heading1: "",
    heading2: "",
    url1: "",
    para1: "",
    para2: "",
    url3: "",
    about: "",
    section5: {
      heading: "",
      requirement: "",
      execution: "",
      delivery: "",
      urlimg: "",
    },
    section6: {
      heading: "",
      para: "",
      list1: "",
      list2: "",
      list3: "",
      grid: {
        cell11: "",
        cell1: "",
        cell21: "",
        cell2: "",
        cell31: "",
        cell3: "",
        cell41: "",
        cell4: "",
      },
    },
    section7: {
      heading1: "",
      heading2: "",
    },
    section8: {
      heading: "",
      requirement: "",
      ideation: "",
      designing: "",
      development: "",
      deployment: "",
    },
    section9: {
      heading1: "",
      heading2: "",
      heading3: "",
      para1: "",
      para2: "",
      para3: "",
    },
    testimonal: "",
    section11: {
      para: "",
    },
  });

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    const updateState = (keys, value, state) => {
      if (keys.length === 1) {
        return { ...state, [keys[0]]: value };
      }
      return {
        ...state,
        [keys[0]]: updateState(keys.slice(1), value, state[keys[0]]),
      };
    };

    setState((prevState) => updateState(keys, value, prevState));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload images

      const finalObj= {...state,url1,url2,url3}
      console.log('url',finalObj)
      // Prepare the data to be sent for the input fields
      const inputData = {
        data : JSON.stringify(finalObj),
        title,
        description,
        category,        
        imageUrl:url0
      };

      // Send input data
      const inputResponse = await fetch(
        "https://heybuddyapiadmin.azurewebsites.net/service/card",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inputData),
        }
      );

      if (!inputResponse.ok) {
        throw new Error("Failed to submit input data");
      }

      const inputResult = await inputResponse.json();
      console.log("Form submitted successfully", inputResult);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };


  const [file0, setFile0] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const [url0, setUrl0] = useState(null);
  const [url1, setUrl1] = useState(null);
  const [url2, setUrl2] = useState(null);
  const [url3, setUrl3] = useState(null);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    switch (index) {
      case 0:
        setFile0(file);
        break;
      case 1:
        setFile1(file);
        break;
      case 2:
        setFile2(file);
        break;
      case 3:
        setFile3(file);
        break;
      default:
        break;
    }
  };

  const uploadImage = async (index) => {
    let file, setFile, setUrl;
    switch (index) {
      case 0:
        file = file0;
        setFile = setFile0;
        setUrl = setUrl0;
        break;
      case 1:
        file = file1;
        setFile = setFile1;
        setUrl = setUrl1;
        break;
      case 2:
        file = file2;
        setFile = setFile2;
        setUrl = setUrl2;
        break;
      case 3:
        file = file3;
        setFile = setFile3;
        setUrl = setUrl3;
        break;
      default:
        break;
    }

    if (!file) {
      alert("Please select image  to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://heybuddyapiadmin.azurewebsites.net/image/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data?.data?.url; // Assuming the response contains the URL of the uploaded image
        console.log('upload data',data)
        setUrl(imageUrl);
        alert("Image  uploaded successfully!");
      } else {
        alert("Failed to upload.");
      }
    } catch (error) {
      console.error("Error uploading image");
      alert("Error uploading image  Please try again later.");
    }
  };


  console.log(url0,url1,url2,url3,'urlsss')

  return (
    <div className="bg-[url('https://heybuddystorage.blob.core.windows.net/s3-migratedheybuddy/Images/Ellipse8.png')] bg-no-repeat lg:bg-cover bg-[center_top_0rem]">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="category-dropdown">
        <label htmlFor="category">Select Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">Select...</option>
          <option value="AR">AR</option>
          <option value="VR">VR</option>
          <option value="3D">3D</option>
          <option value="CGI">CGI</option>
          <option value="AI">AI</option>
          <option value="Gaming">Gaming</option>
          <option value="Custom Software">Custom Software</option>
        </select>
      </div>
    <div>
      <h2>Case Study Form</h2>
      <div>
        <label htmlFor="fileInput0">Choose image 1 to upload:</label>
        <input type="file" id="fileInput0" onChange={(e) => handleFileChange(0, e)} />
        <button onClick={() => uploadImage(0)}>Upload</button>
        {url0 && <p>Image 1 URL: {url0}</p>}
      </div>
      <div>
        <label htmlFor="fileInput1">Choose image 2 to upload:</label>
        <input type="file" id="fileInput1" onChange={(e) => handleFileChange(1, e)} />
        <button onClick={() => uploadImage(1)}>Upload</button>
        {url1 && <p>Image 2 URL: {url1}</p>}
      </div>
      <div>
        <label htmlFor="fileInput2">Choose image 3 to upload:</label>
        <input type="file" id="fileInput2" onChange={(e) => handleFileChange(2, e)} />
        <button onClick={() => uploadImage(2)}>Upload</button>
        {url2 && <p>Image 3 URL: {url2}</p>}
      </div>
      <div>
        <label htmlFor="fileInput3">Choose image 4 to upload:</label>
        <input type="file" id="fileInput3" onChange={(e) => handleFileChange(3, e)} />
        <button onClick={() => uploadImage(3)}>Upload</button>
        {url3 && <p>Image 4 URL: {url3}</p>}
      </div>
    </div>


      <div className="contact-form-container">
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            name="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="Title"
          />
          <input
            className="input-field"
            name="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Description"
          />
         

          <input
            className="input-field"
            name="heading1"
            value={state.heading1}
            onChange={handleChange}
            placeholder="Heading 1"
          />
          <input
            className="input-field"
            name="heading2"
            value={state.heading2}
            onChange={handleChange}
            placeholder="Heading 2"
          />

          <input
            className="input-field"
            name="para1"
            value={state.para1}
            onChange={handleChange}
            placeholder="Paragraph 1"
          />
          <input
            className="input-field"
            name="para2"
            value={state.para2}
            onChange={handleChange}
            placeholder="Paragraph 2"
          />

          <input
            className="input-field"
            name="about"
            value={state.about}
            onChange={handleChange}
            placeholder="About"
          />

          <fieldset>
            <legend>Section 5</legend>
            <input
              className="input-field"
              name="section5.heading"
              value={state.section5.heading}
              onChange={handleChange}
              placeholder="Heading"
            />
            <input
              className="input-field"
              name="section5.requirement"
              value={state.section5.requirement}
              onChange={handleChange}
              placeholder="Requirement"
            />
            <input
              className="input-field"
              name="section5.execution"
              value={state.section5.execution}
              onChange={handleChange}
              placeholder="Execution"
            />
            <input
              className="input-field"
              name="section5.delivery"
              value={state.section5.delivery}
              onChange={handleChange}
              placeholder="Delivery"
            />
          </fieldset>

          <fieldset>
            <legend>Section 6</legend>
            <input
              className="input-field"
              name="section6.heading"
              value={state.section6.heading}
              onChange={handleChange}
              placeholder="Heading"
            />
            <input
              className="input-field"
              name="section6.para"
              value={state.section6.para}
              onChange={handleChange}
              placeholder="Paragraph"
            />
            <input
              className="input-field"
              name="section6.list1"
              value={state.section6.list1}
              onChange={handleChange}
              placeholder="List 1"
            />
            <input
              className="input-field"
              name="section6.list2"
              value={state.section6.list2}
              onChange={handleChange}
              placeholder="List 2"
            />
            <input
              className="input-field"
              name="section6.list3"
              value={state.section6.list3}
              onChange={handleChange}
              placeholder="List 3"
            />
            <input
              className="input-field"
              name="section6.grid.cell11"
              value={state.section6.grid.cell11}
              onChange={handleChange}
              placeholder="Grid Cell 11"
            />
            <input
              className="input-field"
              name="section6.grid.cell1"
              value={state.section6.grid.cell1}
              onChange={handleChange}
              placeholder="Grid Cell 1"
            />
            <input
              className="input-field"
              name="section6.grid.cell21"
              value={state.section6.grid.cell21}
              onChange={handleChange}
              placeholder="Grid Cell 21"
            />
            <input
              className="input-field"
              name="section6.grid.cell2"
              value={state.section6.grid.cell2}
              onChange={handleChange}
              placeholder="Grid Cell 2"
            />
            <input
              className="input-field"
              name="section6.grid.cell31"
              value={state.section6.grid.cell31}
              onChange={handleChange}
              placeholder="Grid Cell 31"
            />
            <input
              className="input-field"
              name="section6.grid.cell3"
              value={state.section6.grid.cell3}
              onChange={handleChange}
              placeholder="Grid Cell 3"
            />
            <input
              className="input-field"
              name="section6.grid.cell41"
              value={state.section6.grid.cell41}
              onChange={handleChange}
              placeholder="Grid Cell 41"
            />
            <input
              className="input-field"
              name="section6.grid.cell4"
              value={state.section6.grid.cell4}
              onChange={handleChange}
              placeholder="Grid Cell 4"
            />
          </fieldset>

          <fieldset>
            <legend>Section 7</legend>
            <input
              className="input-field"
              name="section7.heading1"
              value={state.section7.heading1}
              onChange={handleChange}
              placeholder="Heading 1"
            />
            <input
              className="input-field"
              name="section7.heading2"
              value={state.section7.heading2}
              onChange={handleChange}
              placeholder="Heading 2"
            />
          </fieldset>

          <fieldset>
            <legend>Section 8</legend>
            <input
              className="input-field"
              name="section8.heading"
              value={state.section8.heading}
              onChange={handleChange}
              placeholder="Heading"
            />
            <input
              className="input-field"
              name="section8.requirement"
              value={state.section8.requirement}
              onChange={handleChange}
              placeholder="Requirement"
            />
            <input
              className="input-field"
              name="section8.ideation"
              value={state.section8.ideation}
              onChange={handleChange}
              placeholder="Ideation"
            />
            <input
              className="input-field"
              name="section8.designing"
              value={state.section8.designing}
              onChange={handleChange}
              placeholder="Designing"
            />
            <input
              className="input-field"
              name="section8.development"
              value={state.section8.development}
              onChange={handleChange}
              placeholder="Development"
            />
            <input
              className="input-field"
              name="section8.deployment"
              value={state.section8.deployment}
              onChange={handleChange}
              placeholder="Deployment"
            />
          </fieldset>

          <fieldset>
            <legend>Section 9</legend>
            <input
              className="input-field"
              name="section9.heading1"
              value={state.section9.heading1}
              onChange={handleChange}
              placeholder="Heading 1"
            />
            <input
              className="input-field"
              name="section9.heading2"
              value={state.section9.heading2}
              onChange={handleChange}
              placeholder="Heading 2"
            />
            <input
              className="input-field"
              name="section9.heading3"
              value={state.section9.heading3}
              onChange={handleChange}
              placeholder="Heading 3"
            />
            <input
              className="input-field"
              name="section9.para1"
              value={state.section9.para1}
              onChange={handleChange}
              placeholder="Paragraph 1"
            />
            <input
              className="input-field"
              name="section9.para2"
              value={state.section9.para2}
              onChange={handleChange}
              placeholder="Paragraph 2"
            />
            <input
              className="input-field"
              name="section9.para3"
              value={state.section9.para3}
              onChange={handleChange}
              placeholder="Paragraph 3"
            />
          </fieldset>

          <input
            className="input-field"
            name="testimonal"
            value={state.testimonal}
            onChange={handleChange}
            placeholder="Testimonial"
          />

          <fieldset>
            <legend>Section 11</legend>
            <input
              className="input-field"
              name="section11.para"
              value={state.section11.para}
              onChange={handleChange}
              placeholder="Paragraph"
            />
          </fieldset>

          <div>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;