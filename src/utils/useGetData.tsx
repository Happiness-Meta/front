import { useMutation } from "@tanstack/react-query";
import userAxiosWithAuth from "./useAxiosWIthAuth";
import { useParams } from "react-router-dom";
import FileTreeStore from "../store/FileTreeStore/FileTreeStore";

const useGetData = () => {
  const { repoId } = useParams();
  const { getNodes } = FileTreeStore();

  const getData = useMutation({
    mutationFn: async () => {
      try {
        const response = await userAxiosWithAuth.get(
          `/api/repos/${repoId}/files`
        );
        getNodes(response.data.data.treeData.children);
        //id 의 값을 uuid로,
        console.log(response.data.data.treeData.children);
      } catch (error) {
        // return console.log(error);
      }
    },
  });
  return getData;
};

export default useGetData;
