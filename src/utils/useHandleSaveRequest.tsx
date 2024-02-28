import { useParams } from "react-router-dom";
import FileTreeStore from "@/store/FileTreeStore/FileTreeStore";
import { removeLeadingSlash } from "./fileTreeUtils";
import editorStore from "@/store/CodePageStore/editorStore";
import userAxiosWithAuth from "./useAxiosWIthAuth";
import useGetData from "./useGetData";

const useHandleSaveRequest = async () => {
  const { selectedNode } = FileTreeStore();
  const { repoId } = useParams();
  const { nodeContent } = editorStore();

  const getDataMutation = useGetData();

  if (!selectedNode) {
    alert("저장할 파일을 선택해주세요.");
    return;
  }
  const originalFilePath = removeLeadingSlash(selectedNode!.key);

  const body = {
    originFilepath: originalFilePath,
    newFilepath: originalFilePath,
    content: nodeContent[1],
  };

  try {
    await userAxiosWithAuth.put(`/api/files/${repoId}`, body);
    getDataMutation.mutate();
  } catch (error) {
    console.log(error);
  }
};

export default useHandleSaveRequest;
