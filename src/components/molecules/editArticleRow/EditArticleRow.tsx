import React from "react";

import Checkbox from "../../atoms/checkbox/Checkbox";
import {
  StyledEditArticleRow,
  StyledIconButton,
} from "./editArticleRow.styled";

import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { RiDeleteBin7Line } from "@react-icons/all-files/ri/RiDeleteBin7Line";

const EditArticleRow = ({
  iteration,
  articleId,
  title,
  perex,
  comments,
  deleteArticle,
  editArticle,
  ...props
}: EditArticleRowProps) => {
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    props.setCheckedBoxes((prevState) => {
      const newState = prevState || {};
      newState[iteration] = isChecked;
      return newState;
    });
    return () => {};
  }, [isChecked]);

  React.useEffect(() => {
    setIsChecked(props.isChecked);
  }, [props.isChecked]);

  return (
    <StyledEditArticleRow
      data-testid="edit-article-row"
      className="edit-article"
    >
      <td className="edit-article__checkbox">
        <Checkbox
          isChecked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
      </td>
      <td className="edit-article__title">{title}</td>
      <td className="edit-article__perex">{perex}</td>
      <td className="edit-article__author">author</td>
      <td className="edit-article__nr-comments">{comments}</td>
      <td className="edit-article__actions-container">
        <div className="edit-article__actions">
          <StyledIconButton
            className="edit-article__button-edit"
            onClick={editArticle}
          >
            <FiEdit2 size="1.2em" />
          </StyledIconButton>
          <StyledIconButton
            className="edit-article__button-delete"
            onClick={() => deleteArticle(articleId!)}
          >
            <RiDeleteBin7Line size="1.2em" />
          </StyledIconButton>
        </div>
      </td>
    </StyledEditArticleRow>
  );
};

interface EditArticleRowProps {
  iteration: number;
  articleId?: string;
  title?: string;
  perex?: string;
  comments?: number;
  deleteArticle: Function;
  editArticle: React.MouseEventHandler<HTMLButtonElement>;
  isChecked: boolean;
  setCheckedBoxes: React.SetStateAction<any>;
}

export default EditArticleRow;
