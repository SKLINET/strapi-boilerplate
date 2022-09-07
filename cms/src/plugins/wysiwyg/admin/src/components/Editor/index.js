import React from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";

const TinyEditor = ({ onChange, name, value }) => {
    return (
        <Editor
            apiKey="hjiprjofziev8cze327dqan7x016r7bfcbdaandx6203uh8a"
            value={value}
            tagName={name}
            onEditorChange={(editorContent) => {
                onChange({ target: { name, value: editorContent } });
            }}
            outputFormat="html"
            init={{
                language: "cs",
                height: 500,
                menubar: false,
                extended_valid_elements: "span, img, small",
                forced_root_block: "",
                convert_urls: false,
                entity_encoding: "raw",
                plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen table emoticons nonbreaking insertdatetime media table paste code help wordcount',
                toolbar:
                    "undo redo | styles | bold italic forecolor backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    table emoticons visualblocks code|\
                    nonbreaking bullist numlist outdent indent | removeformat | help",
                style_formats: [
                    {
                        title: "Nadpisy",
                        items: [
                            { title: "h1", block: "h1" },
                            { title: "h2", block: "h2" },
                            { title: "h3", block: "h3" },
                            { title: "h4", block: "h4" },
                            { title: "h5", block: "h5" },
                            { title: "h6", block: "h6" },
                        ],
                    },

                    {
                        title: "Text",
                        items: [
                            { title: "Odstavec", block: "p" },
                            {
                                title: "Odstavec s malým písmem",
                                block: "small",
                            },
                        ],
                    },
                ],
            }}
        />
    );
};
TinyEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
};
export default TinyEditor;
