import { useMutation } from "@tanstack/react-query";
import userAxiosWithAuth from "./useAxiosWIthAuth";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FileTreeStore from "@/store/FileTreeStore/FileTreeStore";
import editorStore from "@/store/CodePageStore/editorStore";
import globalStore from "@/store/globalStore/globalStore";
import { CreateHandler, DeleteHandler } from "react-arborist";
import { nodeType } from "@/types/TypesForFileTree";
import styles from "@/globalComponents/node/node.module.css";

const useFuncAboutFiles = () => {
  const { repoId } = useParams();
  const { getNodes } = FileTreeStore();
  const { selectedNode, addNode, deleteNode } = FileTreeStore();
  const { nodeContent, updateTabContent, setTerminalContent } = editorStore();
  const { setIsSaved } = globalStore();

  //파일 및 디렉토리 생성 함수
  const onCreate: CreateHandler<nodeType> = ({ type, parentId }) => {
    const newNode: nodeType = {
      id: uuidv4(),
      name: "",
      type: type,
      parentId: parentId === null ? undefined : parentId,
      key: "", //filePath
      content: "",
    };
    addNode(newNode);
    return newNode;
  };

  //파일 및 디렉토리 삭제 함수
  const onDelete: DeleteHandler<nodeType> = ({ ids }) => {
    deleteNode(ids[0]);
  };

  //파일들 서버에서 불러오는 함수
  const getData = useMutation({
    mutationFn: async () => {
      try {
        const response = await userAxiosWithAuth.get(
          `/api/repos/${repoId}/files`
        );
        getNodes(response.data.data.treeData.children);
      } catch (error) {
        return console.log(error);
      }
    },
  });

  //저장버튼 누르면 실행되는 함수
  const handleSaveRequest = useMutation({
    mutationFn: async () => {
      if (!selectedNode) {
        alert("저장할 파일을 선택해주세요.");
        return;
      }

      const parentPath = FileTreeStore.getState().findNodePath(
        selectedNode.parentId!
      );

      let sendFilePath;
      if (parentPath === null) {
        sendFilePath = selectedNode.name;
      } else {
        sendFilePath = parentPath + "/" + selectedNode.name;
      }

      const body = {
        originFilepath: sendFilePath,
        newFilepath: sendFilePath,
        content: nodeContent[1],
      };

      try {
        await userAxiosWithAuth.put(`/api/files/${repoId}`, body);
        setIsSaved(true);
        setTimeout(() => {
          setIsSaved(false);
        }, 1000);
        getData.mutate();
        updateTabContent(selectedNode, nodeContent[1]!);
      } catch (error) {
        console.log(error);
      }
    },
  });
  //실행 시 코드에디터의 내용을 Run시키는 함수
  const handleRunRequest = useMutation({
    mutationFn: async () => {
      if (!nodeContent[1]) {
        alert("실행할 파일을 선택해주세요.");
        return;
      }

      const body = {
        code: nodeContent[1],
      };

      try {
        const response = await userAxiosWithAuth.post(`/api/run`, body);
        setTerminalContent(response.data.data);
        handleSaveRequest.mutate();
      } catch (error) {
        console.log(error);
      }
    },
  });

  //파일 이름에 따라 아이콘 바뀌게 하는 함수
  const SetFileTreeIcon = (name: string) => {
    const draftCheck = name.includes(".");
    let iconSvg;
    if (!draftCheck || name.includes("txt")) {
      iconSvg = <img src={`/svg/draft.svg`} className={styles.directoryIcon} />;
      return iconSvg;
    }
    const icon = name!.toString().split(".").pop();

    iconSvg = <img src={`/svg/${icon}.svg`} className={styles.fileIcon} />;

    return iconSvg;
  };

  return {
    onCreate,
    onDelete,
    getData,
    handleSaveRequest,
    handleRunRequest,
    SetFileTreeIcon,
  };
};

export default useFuncAboutFiles;
