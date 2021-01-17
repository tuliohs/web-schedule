

//const changeImage = ({ field, value }) => setValues({ ...values, [field]: value })
//<input type="file" id="file-input" ref={refer} onChange={e=>getBase64({event:e, changeImage:changeImage})}*/ }

export function getBase64({ event, changeImage }) {
    //function adaptada da biblioteca "react-file-base64"
    // get the files
    let files = event.target.files;

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
            changeImage({
                field: 'imageName',
                value: allFiles[0].name
            })
            changeImage({
                field: 'imageData',
                value: allFiles[0].base64?.toString()
            })
        } // reader.onload

    } // for

}
