class Api::V1::NotesController < ApplicationController
  def index
    notes = Note.where(company_id: params["company_id"])
    render json: notes.to_json(include: :user)
  end

  def create
    note = current_user.notes.build note_params

    if note.save
      render json: note
    else
      render json: {errors: note.errors.full_messages}, status: :bad_request
    end
  end

  private

  def note_params
    params.require(:note).permit(:body, :company_id)
  end
end
