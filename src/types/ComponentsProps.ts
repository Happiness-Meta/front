import { CSSProperties, RefObject } from "react";
import { NodeApi, TreeApi } from "react-arborist";
import { nodeType } from "./TypesForFileTree";

export interface FlipBtnProps {
  isClicked: boolean;
  setIsClicked: (T: boolean) => void;
}

export interface LoadingPageProps {
  finishedGettingData: boolean;
}

export interface NodeRendererProps {
  node: NodeApi;
  tree: TreeApi<() => void>;
  style: CSSProperties;
}

export interface CreateBtnSpaceProps {
  treeRef: React.MutableRefObject<TreeApi<nodeType> | undefined>;
}

export interface SearchFromProps {
  term: string;
  setTerm: (value: string) => void;
}

export interface MyPageProps {
  setIsClicked: (T: boolean) => void;
}

export interface SignInProps {
  setWidthZero: (T: boolean) => void;
}

export interface NicknameInputSpaceProps {
  nicknameRef: RefObject<HTMLInputElement>;
}

export interface PwInputAndErrorMsgSpaceProps {
  pwRef: RefObject<HTMLInputElement>;
  errorMessage: string;
}

export interface WidthZeroProps {
  widthZero: boolean;
}
