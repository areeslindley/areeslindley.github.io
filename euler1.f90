program euler1

  implicit none
  integer, parameter :: xx =50, tt = 50 
  real, Dimension(xx, tt) :: v, p, rho, E, dxb, dxc
  real, Dimension(xx) :: rhov, M
  real :: xmax, xmin
  integer :: i, j
  real :: u
  real, parameter :: T = 10, dt = T/tt, gamma=1.4

  ! Set Initial Conditions
  v(:,:) = 0.0d0
  dxb(:, :) = 1.0d0
  dxc(:, :) = 1.0d0
  do i = 1, 5
     v(i+2,1) = 100
  end do
  print *, 'dxc:', dxc
  !Split plasma into two sides
  do i = 1, xx
     if(i<25) then
        !u = i-50
        rho(i,1) = 1.0
        p(i,1)   = 1.0
        E(i,1)   = 1.0
     else if(i>24) then
        rho(i,1) = 0.125
        p(i,1)   = 0.1
        E(i,1)   = 0.1
     end if
  end do

  !write(*,*) 'Rho is:', rho
  !Set Boundaries
  xmin = 0
  xmax = 200

  !Open files
  open(1, file = 'p.dat')
  open(2, file = 'v.dat')
  open(3, file = 'dxc.dat')
  open(4, file = 'E.dat')
  open(5, file = 'dxb.dat')
  open(6, file = 'rho.dat')
  
  !Compute parameters for all spacial regions i (xx)
  !and all time iterations j (tt)
  do i = 1, xx
     if(i < xx) then
        rhov(i) = 0.5*(dxb(i,j)*p(i,j)+dxb(i+1,j)*p(i+1,j))
        M(i) = dxb(i,1)*rho(i,1)
     end if
     
     do j = 1, tt
        if(j == 1) then
           dxc(i,j) = 1
           dxb(i,j) = 1
        
         else if((i .GT. 1) .AND. (j .GT. 1)) then 
             dxc(i, j) = 0.5 * (dxb(i, j) + dxb(i+1,j))
             v(i, j)   = v(i, j-1) - (dt/rho(i, j-1))*(p(i, j) - p(i-1, j))/(dxc(i, j))
             E(i, j)   = E(i, j-1) - dt*(p(i,j-1)/rho(i,j-1))*(v(i,j-1)-v(i-1,j-1))/dxb(i,j-1)
             dxb(i, j) = dxb(i,j-1) + dt*(v(i,j-1)-v(i-1,j-1))
             rho(i, j) = M(i)/dxb(i,j)
             p(i, j)   = E(i, j)*(gamma-1)*rho(i, j)
          end if
          
          !Write to files
          write(1,*) p(i,j),i,j
          write(2,*) v(i,j),i,j
          write(3,*) dxc(i,j),i,j
          write(4,*) E(i,j),i,j
          write(5,*) dxb(i,j),i,j
          write(6,*) rho(i,j),i,j
          
       end do
    end do
  
1   format(i4,i6,i8)
    !Close files
    close(1)
    close(2)
    close(3)
    close(4)
    close(5)
    close(6)
    
    !print *, shape(p)
    !print *, size(p)
    !print *, dxc
  
END program euler1
