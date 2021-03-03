import { Instance } from "mobx-state-tree"
import { VoteModelBase } from "./VoteModel.base"

/* The TypeScript type of an instance of VoteModel */
export interface VoteModelType extends Instance<typeof VoteModel.Type> {}

/* A graphql query fragment builders for VoteModel */
export { selectFromVote, voteModelPrimitives, VoteModelSelector } from "./VoteModel.base"

/**
 * VoteModel
 */
export const VoteModel = VoteModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
