"""create appointments table

Revision ID: bb50452feec4
Revises: 2ea73bcaa2cc
Create Date: 2024-04-28 16:05:25.644538

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bb50452feec4'
down_revision = '2ea73bcaa2cc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('appointments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('client_name', sa.String(), nullable=True),
    sa.Column('appointment_time', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_appointments'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('appointments')
    # ### end Alembic commands ###