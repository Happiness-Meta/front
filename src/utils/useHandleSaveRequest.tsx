import { useParams } from "react-router-dom";
import FileTreeStore from "../store/FileTreeStore/FileTreeStore";
import { removeLeadingSlash } from "./fileTreeUtils";
import editorStore from "../store/CodePageStore/editorStore";
import userAxiosWithAuth from "./useAxiosWIthAuth";

const useHandleSaveRequest = async () => {
  const { selectedNode } = FileTreeStore();
  const { repoId } = useParams();
  const { nodeContent } = editorStore();

  if (!selectedNode) {
    alert("저장할 파일을 선택해주세요.");
    return;
  }
  const originalFilePath = removeLeadingSlash(selectedNode!.key);
  // let newFilePath;

  // const parentPath = FileTreeStore.getState().findNodePath(
  //   selectedNode!.parentId
  // );

  // if (parentPath === null) {
  //   newFilePath = newNodeName;
  // } else {
  //   newFilePath = parentPath + "/" + newNodeName;
  // }
  // const sendNewFilePath = removeLeadingSlash(newFilePath);

  const body = {
    originFilepath: originalFilePath,
    newFilepath: originalFilePath,
    content: nodeContent[1],
  };
  try {
    console.log(body);
    const response = await userAxiosWithAuth.put(`/api/files/${repoId}`, body);
    console.log(response.data);
    console.log(nodeContent[1]);
  } catch (error) {
    console.log(error);
  }
};

export default useHandleSaveRequest;
