

//const changeImage = ({ field, value }) => setValues({ ...values, [field]: value })
//<input type="file" id="file-input" ref={refer} onChange={e=>getBase64({event:e, changeImage:changeImage})}*/ }

export type TImageObj = {
    imageData?: string,
    imageName?: string
}

type TFileInfo = {
    name: string;
    type: any;
    size: string;
    base64: string | ArrayBuffer | null;
    file: any;
}
export const getBase64 = function (event: React.ChangeEvent<HTMLInputElement>,
    changeImage: (values: TImageObj) => void): void {
    //function adaptada da biblioteca "react-file-base64"
    // get the files
    console.log('w', changeImage)
    let files: any = event.target.files;

    // Process each file
    var allFiles: Array<TFileInfo> = [];
    for (var i = 0; i < files.length; i++) {

        let file = files[i];

        // Make new FileReader
        let reader = new FileReader();

        // Convert the file to base64 text
        reader.readAsDataURL(file);

        // on reader load somthing...
        reader.onload = () => {

            // Make a fileInfo Object
            let fileInfo: TFileInfo = {
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
            //console.log(allFiles[0])
            changeImage({
                'imageName': allFiles[0].name,
                'imageData': allFiles[0].base64?.toString()
            });
        } // reader.onload

    } // for

}
