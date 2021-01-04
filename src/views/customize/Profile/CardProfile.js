import React, { createRef } from "react";

import CameraAltIcon from '@material-ui/icons/CameraAlt';
import styled from 'styled-components'
import CardLetter from "utils/CardLetter";
//import FileBase from 'react-file-base64';

// components
const Styles = styled.div`

:hover  div div {
  background-color:#000000;
  opacity : 0.4 ;
}
 i{
  display:none;
}
input{
  display:none;
}

:hover i {
  display:block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0; bottom: 0;
  left: 0; right: 0;
  margin: auto;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
}
`

export default function CardProfile({ setValues, values, image }) {

  const refer = createRef()
  //const [imageObj, setImageObj] = useState({})
  const fileClick = () => refer.current.click()


  const hadleImage = ({ field, value }) => {
    setValues({
      ...values,
      [field]: value
    })
  }

  function handleChange(e) {
    //function adaptada da biblioteca "react-file-base64"
    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length === files.length) {
          // Apply Callback function
          //if (this.props.multiple) this.props.onDone(allFiles);
          //else this.props.onDone(allFiles[0]);
        }
        //setImageObj({
        //  imageName: allFiles.name,
        //  imageData: allFiles[0].base64?.toString()
        //})
        hadleImage({
          field: 'imageData',
          value: allFiles[0].base64?.toString()
        })
      } // reader.onload

    } // for

  }
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <Styles >
                <div className="relative items-center align-center w-full">
                  <div >
                    {image ?
                      <img onClick={fileClick}
                        alt="..."
                        src={image}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      /> : <CardLetter letter={values?.firstName} />}
                  </div>
                  <i >
                    < CameraAltIcon style={{ fontSize: 66 }} onClick={fileClick} />
                    <input type="file" id="file-input" ref={refer} onChange={handleChange}
                    />
                  </i>
                </div>

              </Styles>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                    22
                  </span>
                  <span className="text-sm text-gray-500">Friends</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                    10
                  </span>
                  <span className="text-sm text-gray-500">Photos</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                    89
                  </span>
                  <span className="text-sm text-gray-500">Comments</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
              {values?.firstName}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
              Los Angeles, California
            </div>
            <div className="mb-2 text-gray-700 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
              Solution Manager - Creative Tim Officer
            </div>
            <div className="mb-2 text-gray-700">
              <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
              University of Computer Science
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-gray-300 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-gray-800">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm, intimate
                  feel with a solid groove structure. An artist of considerable
                  range.
                </p>
                <a
                  href="#pablo"
                  className="font-normal text-blue-500"
                  onClick={(e) => e.preventDefault()}
                >
                  Show more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
