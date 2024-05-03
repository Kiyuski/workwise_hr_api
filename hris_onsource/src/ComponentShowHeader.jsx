export const ComponentShowHeader = ({ind, chilIn}) => {
   
    switch (ind) {
      case 1:
        return (
          <tr>
          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            LEAVE TYPE
          </th>
          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            NUMBER OF DAYS
          </th>
          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            STATUS
          </th>
          <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ACTION
          </th>
        
       </tr>
        )

       case 2:

        if(chilIn === 0) {
            return (
              <tr>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EMPLOYEE ID #
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   NAME
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LEAVE TYPE
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  APPLY DATE
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  START DATE
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  END DATE
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DURATION
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTION
                </th>
              
             </tr>
              )
      
        }else if(chilIn === 1){
            return (
                <tr>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LEAVE TYPE
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  APPLY DATE
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  START DATE
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  END DATE
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DURATION
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTION
                </th>
              
             </tr>
              )
        }else{
          return (
            <tr>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DEPARTMENT
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                EMPLOYEE ID #
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 NAME
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                LEAVE TYPE
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                APPLY DATE
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                START DATE
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                END DATE
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DURATION
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTION
              </th>
            
           </tr>
            )
        }
         
      default:
        return (
            <tr>
            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              HOLIDAY NAME
            </th>
            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               START DATE
            </th>
            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              END DATE
            </th>
            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              DAYS
            </th>
            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              YEAR
            </th>
            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ACTION
            </th>
          
         </tr>
          )
      
    }
  }
