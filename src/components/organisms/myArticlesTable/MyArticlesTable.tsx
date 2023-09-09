import React from 'react';

import { navigate } from 'gatsby';
import { Components } from '@customTypes/declarations';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
// import { selectMyArticlesItems } from "../../../store/admin/myArticles.slice";
import { getArticlesFeedThunk } from '../../../store/thunks/articles.thunk';
import { AdminLinks } from '../../../utils/contants';
import AdminHeading from '../../molecules/adminHeading/AdminHeading';
import EditArticleRow from '../../molecules/editArticleRow/EditArticleRow';
import EditArticleRowButtons from '../../molecules/editArticleRow/EditArticleRowButtons';
import {
  MyArticlesForm,
  MyArticlesTableContainer,
  StyledArticlesTable,
  StyledFallbackContentContainer,
} from './myArticlesTable.styled';
import {
  selectMyArticlesItems,
  selectMyArticlesOriginalItems,
  selectMyArticlesStatus,
  setArticleToEdit,
} from '../../../store/slices/admin.slices';

import { deleteArticleThunk } from '../../../store/thunks/admin.thunks';

import noArticles from '../../../images/no-articles.png';
import Loading from '../../atoms/loadingIcon/Loading';
import { selectAuthToken } from '../../../store/slices/auth.slices';

// TODO: Finish the my Articles
// TODO: Multiple delete action?
const MyArticlesTable = () => {
  const [checkedBoxes, setCheckedBoxes] = React.useState<boolean[]>([]);
  const originalArray = useAppSelector(selectMyArticlesOriginalItems);
  const articles = useAppSelector(selectMyArticlesItems);
  const status = useAppSelector(selectMyArticlesStatus);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const access_token = useAppSelector(selectAuthToken);

  const deleteArticle = (articleId: string) =>
    dispatch(deleteArticleThunk({ articleId, originalArray, access_token }));
  const editArticle = (article: Components['schemas']['Article']) => {
    dispatch(setArticleToEdit(article));
    navigate(AdminLinks.EDIT_ARTICLE);
  };

  const switchAllBoxes = (isChecked: boolean) => {
    const allBoxesChecked = checkedBoxes.map(() => true);
    const allBoxesUncheck = checkedBoxes.map(() => false);
    if (isChecked) {
      return setCheckedBoxes(allBoxesChecked);
    }
    return setCheckedBoxes(allBoxesUncheck);
  };
  React.useEffect(() => {
    if (!originalArray) dispatch(getArticlesFeedThunk());
  }, [originalArray, dispatch]);

  // TODO: Detach logic of rendering
  return (
    <MyArticlesTableContainer>
      <AdminHeading
        heading="My Articles"
        buttonText="Create new article"
        to={AdminLinks.CREATE_ARTICLE}
      />
      <MyArticlesForm onSubmit={(e) => e.preventDefault()}>
        {status === 'loading' && (
          <StyledFallbackContentContainer>
            <Loading />
          </StyledFallbackContentContainer>
        )}
        {articles && articles.length === 0 && (
          <StyledFallbackContentContainer>
            <img src={noArticles} alt="No articles, you should cooksome" />
            <span>No articles written yet, you should cook some!</span>
          </StyledFallbackContentContainer>
        )}
        {articles.length > 0 && (
          <StyledArticlesTable>
            <tbody>
              <EditArticleRowButtons
                originalArray={originalArray}
                switchAllBoxes={switchAllBoxes}
                dispatch={dispatch}
              />
              {articles.map(
                (article: Components['schemas']['ArticleDetail'], i) => {
                  const { articleId, title, perex, comments } = article;
                  return (
                    <EditArticleRow
                      key={articleId}
                      iteration={i}
                      articleId={articleId}
                      title={title}
                      perex={perex}
                      comments={comments!.length}
                      deleteArticle={deleteArticle}
                      editArticle={() => editArticle(article)}
                      isChecked={checkedBoxes[i]}
                      setCheckedBoxes={setCheckedBoxes}
                    />
                  );
                }
              )}
            </tbody>
          </StyledArticlesTable>
        )}
      </MyArticlesForm>
    </MyArticlesTableContainer>
  );
};

export default MyArticlesTable;
