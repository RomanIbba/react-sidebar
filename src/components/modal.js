import React from 'react'
import '../styles/modal.css'


const Modal = (props) => {
    const { showAddModal, showEditModal, showDeleteModal } = props;
    // console.log("Add " +showAddModal)
    // console.log("Edit " + showEditModal)
    // console.log("Delete "+ showDeleteModal)

    if(showAddModal){
        
        return(
            // Add Modal
            <div class="myModal" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modalHeader">
                            <span class="headerTitle">Add New Plan</span>
                            <button class="closeBtn pull-right" onClick={()=>props.setShowAddModal(false)}>×</button>
    
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>MAWB:</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>userid:</label>
                                <input type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="footerBtn pull-right">
                                <button class="btn btn-default" onClick={()=>props.setShowAddModal(false)}><span class="glyphicon glyphicon-remove"></span> Cancel</button> <button class="btn btn-primary" onClick={()=>props.setShowAddModal(false)}><span class="glyphicon glyphicon-floppy-disk"></span> Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )

    }else if(showEditModal){
        return(
            //  Edit Modal 
            <div class="myModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="editHeader">
                        <span class="headerTitle">Edit Plan</span>
                        <button class="closeEditBtn pull-right" onClick={()=>props.setShowEditModal(false)}>×</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>ID:</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label>MAWB:</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label>User ID:</label>
                            <input type="text" class="form-control" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="footerBtn pull-right">
                            <button class="btn btn-default" onClick={()=>props.setShowEditModal(false)}><span class="glyphicon glyphicon-remove"></span> Cancel</button> <button class="btn btn-success" onClick={()=>props.setShowEditModal(false)}><span class="glyphicon glyphicon-check"></span> Save</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )

    }else if(showDeleteModal){
        return(
            //  Delete Modal 
            <div class="myModal" v-if="showDeleteModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="deleteHeader">
                        <span class="headerTitle">Delete Plan</span>
                        <button class="closeDelBtn pull-right" onClick={()=>props.setShowDeleteModal(false)}>×</button>
                    </div>
                    <div class="modal-body">
                        <h5 class="text-center">Are you sure you want to Delete</h5>
                        {/* <h2 class="text-center">{{clickPlan.mawb}} {{clickPlan.userid}}</h2> */}
                    </div>
                    <div class="modal-footer">
                        <div class="footerBtn pull-right">
                            <button class="btn btn-default" onClick={()=>props.setShowDeleteModal(false)}><span class="glyphicon glyphicon-remove"></span> Cancel</button> <button class="btn btn-danger" onClick={()=>props.setShowDeleteModal(false)}><span class="glyphicon glyphicon-trash"></span> Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Modal