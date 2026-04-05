import { React, useEffect, useState } from "react";
import { Modal, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchById } from "../redux/wordSlice";


function WordModalInfo({
  isVisible,
  setIsVisible,
  wordId,
}) {
  const dispatch = useDispatch();
  const word = useSelector((store) => store.words.entity);

  useEffect(() => {
    if (isVisible) {
      dispatch(fetchById(wordId)).unwrap()
      .catch((error) => {
        console.error("Failed to fetch word details:", error);
      });
    }
  }, [isVisible, word]);

  return (
    <>
      <Modal
        title="Word Details"
        open={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
      >
        <Typography>
          <pre>ID: {word?.id}</pre>
          <pre>English: {word?.english}</pre>
          <pre>Turkish: {word?.turkish}</pre>
          <pre>English (2nd): {word?.english2English}</pre>
          <pre>Synonym: {word?.synonym}</pre>
          <pre>Sentence: {word?.sentence}</pre>
          <pre>Notes: {word?.notes}</pre>
          <pre>Level: {word?.level}</pre>
        </Typography>
      </Modal>
    </>
  );
}

export default WordModalInfo;
